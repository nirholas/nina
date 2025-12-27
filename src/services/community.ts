/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Shipping features and spreading joy 🎁
 */

/**
 * Community Services - Sharing, Publishing, and Social Features
 */
import { supabase } from '@/lib/supabase';

// =============================================================================
// TYPES
// =============================================================================

export interface SharedProject {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  files: ProjectFile[];
  template_id: string | null;
  category: 'sandbox' | 'template' | 'tutorial' | 'example';
  tags: string[];
  is_public: boolean;
  share_token: string;
  likes_count: number;
  views_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  author?: {
    id: string;
    username: string | null;
    avatar_url: string | null;
  };
}

export interface ProjectFile {
  name: string;
  content: string;
  language: string;
}

export interface ProjectComment {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: {
    username: string | null;
    avatar_url: string | null;
  };
}

export interface ProjectLike {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
}

export interface CommunityTemplate {
  id: string;
  user_id: string;
  name: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
  is_approved: boolean;
  downloads_count: number;
  created_at: string;
  author?: {
    username: string | null;
    avatar_url: string | null;
  };
}

export interface TutorialSubmission {
  id: string;
  user_id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

// =============================================================================
// PROJECT SHARING
// =============================================================================

/**
 * Share a project publicly
 */
export async function shareProject(project: {
  title: string;
  description?: string;
  files: ProjectFile[];
  templateId?: string;
  category?: 'sandbox' | 'template' | 'tutorial' | 'example';
  tags?: string[];
  walletAddress?: string;
}): Promise<{ data: SharedProject | null; error: string | null; shareUrl: string | null }> {
  try {
    // Use wallet address or anonymous
    const userId = project.walletAddress || 'anonymous';

    // Generate unique share token
    const shareToken = generateShareToken();

    const { data, error } = await supabase
      .from('shared_projects')
      .insert({
        user_id: userId,
        title: project.title,
        description: project.description || null,
        files: project.files,
        template_id: project.templateId || null,
        category: project.category || 'sandbox',
        tags: project.tags || [],
        is_public: true,
        share_token: shareToken,
        likes_count: 0,
        views_count: 0,
        forks_count: 0
      })
      .select()
      .single();

    if (error) throw error;

    const shareUrl = `${window.location.origin}/shared/${shareToken}`;
    
    return { data, error: null, shareUrl };
  } catch (error: any) {
    console.error('Error sharing project:', error);
    return { data: null, error: error.message, shareUrl: null };
  }
}

/**
 * Get a shared project by token
 */
export async function getSharedProject(shareToken: string): Promise<{ data: SharedProject | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('shared_projects')
      .select(`
        *,
        author:profiles!user_id (
          id,
          username,
          avatar_url
        )
      `)
      .eq('share_token', shareToken)
      .eq('is_public', true)
      .single();

    if (error) throw error;

    // Increment view count
    await supabase
      .from('shared_projects')
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq('id', data.id);

    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching shared project:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Get all public projects (explore page)
 */
export async function getPublicProjects(options?: {
  category?: string;
  tags?: string[];
  sortBy?: 'recent' | 'popular' | 'likes';
  limit?: number;
  offset?: number;
}): Promise<{ data: SharedProject[]; error: string | null; total: number }> {
  try {
    let query = supabase
      .from('shared_projects')
      .select(`
        *,
        author:profiles!user_id (
          id,
          username,
          avatar_url
        )
      `, { count: 'exact' })
      .eq('is_public', true);

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.tags && options.tags.length > 0) {
      query = query.contains('tags', options.tags);
    }

    // Sorting
    switch (options?.sortBy) {
      case 'popular':
        query = query.order('views_count', { ascending: false });
        break;
      case 'likes':
        query = query.order('likes_count', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data || [], error: null, total: count || 0 };
  } catch (error: any) {
    console.error('Error fetching public projects:', error);
    return { data: [], error: error.message, total: 0 };
  }
}

/**
 * Get user's own projects
 */
export async function getMyProjects(): Promise<{ data: SharedProject[]; error: string | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: [], error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from('shared_projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching my projects:', error);
    return { data: [], error: error.message };
  }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<{ error: string | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: 'Not authenticated' };
    }

    const { error } = await supabase
      .from('shared_projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

/**
 * Fork a project (using wallet address)
 */
export async function forkProject(shareToken: string, walletAddress?: string): Promise<{ data: SharedProject | null; error: string | null }> {
  try {
    if (!walletAddress) {
      return { data: null, error: 'Please connect your wallet to fork projects' };
    }

    // Get original project
    const { data: original, error: fetchError } = await supabase
      .from('shared_projects')
      .select('*')
      .eq('share_token', shareToken)
      .single();

    if (fetchError || !original) {
      return { data: null, error: 'Project not found' };
    }

    // Create fork
    const newShareToken = generateShareToken();
    const { data: fork, error } = await supabase
      .from('shared_projects')
      .insert({
        user_id: walletAddress,
        title: `${original.title} (Fork)`,
        description: original.description,
        files: original.files,
        template_id: original.template_id,
        category: original.category,
        tags: original.tags,
        is_public: false, // Start as private
        share_token: newShareToken,
        likes_count: 0,
        views_count: 0,
        forks_count: 0
      })
      .select()
      .single();

    if (error) throw error;

    // Increment fork count on original
    await supabase
      .from('shared_projects')
      .update({ forks_count: (original.forks_count || 0) + 1 })
      .eq('id', original.id);

    return { data: fork, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// =============================================================================
// LIKES & COMMENTS
// =============================================================================

/**
 * Like a project (using wallet address)
 */
export async function likeProject(projectId: string, walletAddress?: string): Promise<{ liked: boolean; error: string | null }> {
  try {
    if (!walletAddress) {
      return { liked: false, error: 'Please connect your wallet to like projects' };
    }

    // Check if already liked
    const { data: existing } = await supabase
      .from('project_likes')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', walletAddress)
      .single();

    if (existing) {
      // Unlike
      await supabase
        .from('project_likes')
        .delete()
        .eq('id', existing.id);

      // Decrement count
      await supabase.rpc('decrement_likes', { project_id: projectId });

      return { liked: false, error: null };
    } else {
      // Like
      await supabase
        .from('project_likes')
        .insert({ project_id: projectId, user_id: walletAddress });

      // Increment count
      await supabase.rpc('increment_likes', { project_id: projectId });

      return { liked: true, error: null };
    }
  } catch (error: any) {
    return { liked: false, error: error.message };
  }
}

/**
 * Check if wallet has liked a project
 */
export async function hasLikedProject(projectId: string, walletAddress?: string): Promise<boolean> {
  try {
    if (!walletAddress) return false;

    const { data } = await supabase
      .from('project_likes')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', walletAddress)
      .single();

    return !!data;
  } catch {
    return false;
  }
}

/**
 * Add a comment to a project (using wallet address)
 */
export async function addComment(projectId: string, content: string, walletAddress?: string): Promise<{ data: ProjectComment | null; error: string | null }> {
  try {
    if (!walletAddress) {
      return { data: null, error: 'Please connect your wallet to comment' };
    }

    const { data, error } = await supabase
      .from('project_comments')
      .insert({
        project_id: projectId,
        user_id: walletAddress,
        content
      })
      .select(`
        *,
        author:profiles!user_id (
          username,
          avatar_url
        )
      `)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

/**
 * Get comments for a project
 */
export async function getComments(projectId: string): Promise<{ data: ProjectComment[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('project_comments')
      .select(`
        *,
        author:profiles!user_id (
          username,
          avatar_url
        )
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
}

// =============================================================================
// COMMUNITY TEMPLATES
// =============================================================================

/**
 * Submit a template to the community
 */
export async function submitTemplate(template: {
  name: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
}): Promise<{ data: CommunityTemplate | null; error: string | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: 'You must be logged in to submit templates' };
    }

    const { data, error } = await supabase
      .from('community_templates')
      .insert({
        user_id: user.id,
        name: template.name,
        description: template.description,
        code: template.code,
        category: template.category,
        tags: template.tags,
        is_approved: false,
        downloads_count: 0
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

/**
 * Get approved community templates
 */
export async function getCommunityTemplates(options?: {
  category?: string;
  search?: string;
  limit?: number;
}): Promise<{ data: CommunityTemplate[]; error: string | null }> {
  try {
    let query = supabase
      .from('community_templates')
      .select(`
        *,
        author:profiles!user_id (
          username,
          avatar_url
        )
      `)
      .eq('is_approved', true)
      .order('downloads_count', { ascending: false });

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
}

// =============================================================================
// TUTORIAL SUBMISSIONS
// =============================================================================

/**
 * Submit a tutorial for review
 */
export async function submitTutorial(tutorial: {
  title: string;
  description: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
}): Promise<{ data: TutorialSubmission | null; error: string | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: 'You must be logged in to submit tutorials' };
    }

    const { data, error } = await supabase
      .from('tutorial_submissions')
      .insert({
        user_id: user.id,
        title: tutorial.title,
        description: tutorial.description,
        content: tutorial.content,
        difficulty: tutorial.difficulty,
        category: tutorial.category,
        tags: tutorial.tags,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// =============================================================================
// UTILITIES
// =============================================================================

function generateShareToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 12; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Generate embed code for a project
 */
export function generateEmbedCode(shareToken: string, options?: {
  width?: string;
  height?: string;
  theme?: 'light' | 'dark';
}): string {
  const width = options?.width || '100%';
  const height = options?.height || '500px';
  const theme = options?.theme || 'dark';
  
  return `<iframe 
  src="${window.location.origin}/embed/${shareToken}?theme=${theme}"
  width="${width}"
  height="${height}"
  style="border: 1px solid #374151; border-radius: 8px;"
  loading="lazy"
  allow="clipboard-write"
></iframe>`;
}
