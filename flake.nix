{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/25.11";
  };

  outputs = {nixpkgs, ...}: let
    systems = [
      "x86_64-linux"
      "aarch64-linux"
    ];
  in {
    devShells = nixpkgs.lib.genAttrs systems (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      packages = with pkgs; [
        nodejs_24
        esbuild
      ];
      ESBUILD_BINARY_PATH = "${pkgs.esbuild}/bin/esbuild";
    });
    packages = nixpkgs.lib.genAttrs systems (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      default = pkgs.buildNpmPackage rec {
        name = "megakuul";

        src = ./.;

        nodejs = pkgs.nodejs_24;

        installPhase = ''
          install -Dm644 .sveltekit/output/ $out/share/${name}
        '';

        npmDepsHash = "sha256-lQ8/CAPTDbsaF0PNevvQBO+896RbmevaFY8Ocy9+YA4=";
      };
    });
  };
}
