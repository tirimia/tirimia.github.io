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
      build-with-docker = pkgs.writeShellScriptBin "build-notes" ''
        mkdir -p result/azubinomicon
        ${pkgs.docker}/bin/docker run -v ./notes:/graph:ro -v ./result/azubinomicon:/out -e PUB_THEME=dark --platform linux/amd64 -it ghcr.io/l-trump/logseq-publish-spa:alpine
      '';
      full-bundle = pkgs.writeShellScriptBin "full-bundle" ''
        mkdir -p result
        ${pkgs.pnpm}/bin/pnpm -C main install
        ${pkgs.pnpm}/bin/pnpm -C main run build
        cp main/dist/* result/
        ${build-with-docker}/bin/build-notes
      '';
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = [pkgs.logseq build-with-docker full-bundle];
      };
      apps.default = {
        type = "app";
        program = "${full-bundle}/bin/full-bundle";
      };
      packages.frontend-dev = pkgs.vscode-with-extensions.override {
        vscode = pkgs.vscode; # VSCodium wouldn't load extensions on my mac
        vscodeExtensions = with pkgs.vscode-extensions; [
          astro-build.astro-vscode
          bbenoist.nix
        ];
      };
    });
}
