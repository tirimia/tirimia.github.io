{
  description = "Personal homepage for tirimia";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachSystem ["aarch64-darwin" "x86_64-linux"] (system: let
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
      build = pkgs.writeShellScriptBin "build" ''
        ${pkgs.pnpm}/bin/pnpm install # Ridiculous strats for sharp to work
        ${pkgs.pnpm}/bin/pnpm run build
      '';
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = [pkgs.bun build];
      };
      packages.frontend-dev = pkgs.vscode-with-extensions.override {
        vscode = pkgs.vscode; # VSCodium wouldn't load extensions on my mac
        vscodeExtensions = with pkgs.vscode-extensions; [
          astro-build.astro-vscode
          bbenoist.nix
          gruntfuggly.todo-tree
          unifiedjs.vscode-mdx
          supermaven.supermaven
        ];
      };
    });
}
