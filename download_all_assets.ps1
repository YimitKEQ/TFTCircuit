# PowerShell script to download all assets for the TFT Tierlist Website

$ErrorActionPreference = "Stop"

# Base URLs
$traitBaseUrl = "https://cdn.mobalytics.gg/assets/common/icons/tft-synergies-set15/"
$itemBaseUrl = "https://cdn.mobalytics.gg/assets/tft/images/game-items/set15/"
$championBaseUrl = "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set15/"

# Trait Icons
$traitIcons = @(
    "24-the-crew.svg?v=68", "24-the-champ.svg?v=68", "24-mighty-mech.svg?v=68", "24-mentor.svg?v=68",
    "24-battle-academia.svg?v=68", "24-crystal-gambit.svg?v=68", "24-duelist.svg?v=68",
    "24-edgelord.svg?v=68", "24-executioner.svg?v=68", "24-heavyweight.svg?v=68", "24-juggernaut.svg?v=68",
    "24-luchador.svg?v=68", "24-monster-trainer.svg?v=68", "24-prodigy.svg?v=68", "24-protector.svg?v=68",
    "24-sniper.svg?v=68", "24-sorcerer.svg?v=68", "24-soul-fighter.svg?v=68", "24-star-guardian.svg?v=68",
    "24-strategist.svg?v=68", "24-supreme-cells.svg?v=68", "24-wraith.svg?v=68", "24-bastion.svg?v=68"
)

# Item Icons
$itemIcons = @(
    "adaptive-helm.png", "archangels-staff.png", "bastion-emblem.png", "battle-academia-emblem.png",
    "bloodthirster.png", "blue-buff2.png", "bramble-vest.png", "crownguard.png", "crystal-gambit-emblem.png",
    "deathblade.png", "dragons-claw.png", "duelist-emblem.png", "edgelord-emblem.png", "edge-of-night.png",
    "evenshroud.png", "executioner-emblem1.png", "gargoyle-stoneplate.png", "giant-slayer.png",
    "guinsoos-rageblade.png", "hand-of-justice.png", "heavyweight-emblem.png", "hextech-gunblade.png",
    "infinity-edge.png", "ionic-spark.png", "jeweled-gauntlet.png", "juggernaut-emblem.png", "krakensfury.png",
    "last-whisper.png", "luchador-emblem.png", "morellonomicon.png", "nashor's-tooth.png", "prodigy-emblem.png",
    "fimbulwinter.png", "quicksilver.png", "rabadons-deathcap.png", "redbuff.png", "sorcerer-emblem.png",
    "soul-fighter-emblem.png", "spear-of-shojin2.png", "spiritvisage.png", "star-guardian-emblem.png",
    "steadfast-hammer.png", "sterak's-gage.png", "strategist-emblem.png", "guardbreaker.png", "sunfire-cape.png",
    "supreme-cells-emblem.png", "tacticians_cape.png", "tacticians-crown.png", "tacticians_shield.png",
    "thiefs-gloves.png", "titans-resolve.png", "voidstaff.png", "warmogs-armor.png", "wraith-emblem.png",
    "blighting-jewel1.png", "dawncore.png", "deathfire-grasp.png", "deaths-defiance.png", "fishbones1.png",
    "flickerblade.png", "gamblers-blade2.png", "gold-collector.png", "horizon-focus1.png", "hullcrusher.png",
    "indomitable-gauntlet.png", "infinity-force.png", "innervating-locket1.png", "lich-bane1.png",
    "lightshield-crest1.png", "luden's-tempest1.png", "manazane.png", "mittens1.png", "moguls-mail2.png",
    "prowler's-claw1.png", "rapid-firecannon1.png", "seeker's-armguard1.png", "silvermere-dawn1.png",
    "snipers_focus.png", "spectral-cutlass1.png", "statikk-shiv.png", "suspicious-trench-coat1.png",
    "talisman-of-ascension1.png", "titanic-hydra.png", "tricksters-glass.png", "unending-despair1.png",
    "wits-end1.png", "zhonyas-paradox.png"
)

# Champion Icons
$championIcons = @(
    "aatrox.jpg", "ahri.jpg", "akali.jpg", "ashe.jpg", "braum.jpg", "caitlyn.jpg", "darius.jpg", "dr-mundo.jpg",
    "ekko.jpg", "ezreal.jpg", "gangplank.jpg", "garen.jpg", "gnar.jpg", "gwen.jpg", "janna.jpg", "jarvan-iv.jpg",
    "jayce.jpg", "jhin.jpg", "jinx.jpg", "kai'sa.jpg", "kalista.jpg", "karma.jpg", "katarina.jpg", "kayle.jpg",
    "kennen.jpg", "kobuko.jpg", "kog'maw.jpg", "k'sante.jpg", "lee-sin.jpg", "leona.jpg", "lucian.jpg", "lulu.jpg",
    "lux.jpg", "malphite.jpg", "malzahar.jpg", "naafiri.jpg", "neeko.jpg", "poppy.jpg", "rakan.jpg", "rammus.jpg",
    "rell.jpg", "ryze.jpg", "samira.jpg", "senna.jpg", "seraphine.jpg", "sett.jpg", "shen.jpg", "sivir.jpg",
    "smolder.jpg", "swain.jpg", "syndra.jpg", "twisted-fate.jpg", "udyr.jpg", "varus.jpg", "vi.jpg", "viego.jpg",
    "volibear.jpg", "xayah.jpg", "xin-zhao.jpg", "yasuo.jpg", "yone.jpg", "yuumi.jpg", "zac.jpg", "ziggs.jpg", "zyra.jpg"
)

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "assets/images/traits"
New-Item -ItemType Directory -Force -Path "assets/images/items"
New-Item -ItemType Directory -Force -Path "assets/images/champions"

# Download Trait Icons
foreach ($icon in $traitIcons) {
    $fileName = $icon.Split('?')[0].Replace("24-", "")
    $url = $traitBaseUrl + $icon
    $path = "assets/images/traits/" + $fileName
    try {
        Write-Host "Downloading $url to $path..."
        Invoke-WebRequest -Uri $url -OutFile $path
        Write-Host "Successfully downloaded $path"
    }
    catch {
        Write-Error "Failed to download $url. Error: $_"
    }
}

# Download Item Icons
foreach ($icon in $itemIcons) {
    $url = $itemBaseUrl + $icon + "?v=68"
    $path = "assets/images/items/" + $icon
    try {
        Write-Host "Downloading $url to $path..."
        Invoke-WebRequest -Uri $url -OutFile $path
        Write-Host "Successfully downloaded $path"
    }
    catch {
        Write-Error "Failed to download $url. Error: $_"
    }
}

# Download Champion Icons
foreach ($icon in $championIcons) {
    $urlFileName = $icon.Replace("-", "").Replace("'", "")
    $url = $championBaseUrl + $urlFileName + "?v=68"
    $path = "assets/images/champions/" + $icon
    try {
        Write-Host "Downloading $url to $path..."
        Invoke-WebRequest -Uri $url -OutFile $path
        Write-Host "Successfully downloaded $path"
    }
    catch {
        Write-Error "Failed to download $url. Error: $_"
    }
}

Write-Host "Asset download script finished."