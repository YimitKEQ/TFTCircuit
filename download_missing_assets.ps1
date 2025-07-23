# PowerShell script to download missing trait icons

$ErrorActionPreference = "Stop"

$assets = @(
    @{
        "url" = "https://cdn.mobalytics.gg/assets/common/icons/tft-synergies-set15/24-the-crew.svg?v=68"
        "path" = "assets/images/traits/the-crew.svg"
    },
    @{
        "url" = "https://cdn.mobalytics.gg/assets/common/icons/tft-synergies-set15/24-the-champ.svg?v=68"
        "path" = "assets/images/traits/the-champ.svg"
    },
    @{
        "url" = "https://cdn.mobalytics.gg/assets/common/icons/tft-synergies-set15/24-mighty-mech.svg?v=68"
        "path" = "assets/images/traits/mighty-mech.svg"
    },
    @{
        "url" = "https://cdn.mobalytics.gg/assets/common/icons/tft-synergies-set15/24-mentor.svg?v=68"
        "path" = "assets/images/traits/mentor.svg"
    }
)

foreach ($asset in $assets) {
    try {
        Write-Host "Downloading $($asset.url) to $($asset.path)..."
        Invoke-WebRequest -Uri $asset.url -OutFile $asset.path
        Write-Host "Successfully downloaded $($asset.path)"
    }
    catch {
        Write-Error "Failed to download $($asset.url). Error: $_"
    }
}

Write-Host "Asset download script finished."
