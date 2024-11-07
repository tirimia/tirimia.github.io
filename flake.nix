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
      python = pkgs.python3.withPackages (p: [p.pandocfilters p.panflute]);
      convertFile = pkgs.writeScriptBin "convert-note" ''
        NOTE=''${1:?No note given}
        EXPORT_DIR=$(realpath ''${2-.})
        EXPORTED=$(basename $NOTE | sed -e 's/\.org$/\.html/')
        export ORG_ROAM_DB_PATH="${./notes-org/roam.db}"
        # Use correct python
        PATH=${python}/bin:$PATH
        ${pkgs.pandoc}/bin/pandoc -f org -t html5 --template ${./note-template.html} --filter ${./pandoc-link.py} $NOTE -o $EXPORT_DIR/$EXPORTED
      '';
      build = pkgs.writeShellScriptBin "build" ''
        set -e
        mkdir -p result

        mkdir -p main/public/azubinomicon/notes
        find notes-org -type f -name "*.org" | xargs -I {} ${convertFile}/bin/convert-note {} main/public/azubinomicon/notes
        cp -r notes-org/assets main/public/azubinomicon/notes/

        pushd main
        ${pkgs.bun}/bin/bun i
        ${pkgs.bun}/bin/bun run build
        popd

        cp -r main/dist/* result/
      '';
      e2eTest = pkgs.writeShellScriptBin "e2e" ''
        set -e
        ${build}/bin/build
        ${pkgs.python3}/bin/python3 -m http.server -b localhost 8080 -d result
      '';
    in {
      devShells.default = pkgs.mkShell {
        ORG_ROAM_DB_PATH=./notes-org/roam.db;
        buildInputs = [pkgs.biome pkgs.bun pkgs.logseq pkgs.pandoc build e2eTest python convertFile];
      };
      apps.default = {
        type = "app";
        program = "${build}/bin/build";
      };
      packages.frontend-dev = pkgs.vscode-with-extensions.override {
        vscode = pkgs.vscode; # VSCodium wouldn't load extensions on my mac
        vscodeExtensions = with pkgs.vscode-extensions; [
          astro-build.astro-vscode
          bbenoist.nix
          ms-python.python
        ];
      };
    });
}
