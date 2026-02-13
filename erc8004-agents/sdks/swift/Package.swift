// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "ERC8004",
    platforms: [
        .macOS(.v13),
        .iOS(.v16),
    ],
    products: [
        .library(
            name: "ERC8004",
            targets: ["ERC8004"]
        ),
    ],
    dependencies: [
        // web3.swift for Ethereum interactions
    ],
    targets: [
        .target(
            name: "ERC8004",
            path: "Sources/ERC8004"
        ),
        .testTarget(
            name: "ERC8004Tests",
            dependencies: ["ERC8004"],
            path: "Tests/ERC8004Tests"
        ),
    ]
)
