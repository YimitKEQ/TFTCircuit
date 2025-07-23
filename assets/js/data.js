const championsData = [
    // SET 15 CHAMPIONS
    // 1-COST
    {
        id: 'aatrox',
        name: 'Aatrox',
        cost: 1,
        traits: ['Juggernaut'],
        ability: { name: 'Blade Vigor', description: 'Heals and deals physical damage to the current target.' },
        role: 'Tank',
        items: ['Bloodthirster', 'Titan\'s Resolve', 'Warmog\'s Armor']
    },
    {
        id: 'ezreal',
        name: 'Ezreal',
        cost: 1,
        traits: ['Battle Academia'],
        ability: { name: 'Rising Spell Force', description: 'Fires a blast, then blinks and gains stacking buffs.' },
        role: 'Marksman',
        items: ['Blue Buff', 'Red Buff', 'Statikk Shiv']
    },
    {
        id: 'garen',
        name: 'Garen',
        cost: 1,
        traits: ['Battle Academia', 'Bastion'],
        ability: { name: 'Mighty Blade of Justice', description: 'Heals, deals physical damage, and gains max Health.' },
        role: 'Tank',
        items: ['Sunfire Cape', 'Dragon\'s Claw', 'Bramble Vest']
    },
    {
        id: 'gnar',
        name: 'Gnar',
        cost: 1,
        traits: ['Sniper'],
        ability: { name: 'Gadagadagada!', description: 'Passively gains AP on attacks. Actively gains AD and grants AD to allies.' },
        role: 'Fighter',
        items: ['Guinsoo\'s Rageblade', 'Bloodthirster', 'Titan\'s Resolve']
    },
    {
        id: 'kalista',
        name: 'Kalista',
        cost: 1,
        traits: ['Soul Fighter'],
        ability: { name: 'Spirit Spear', description: 'Hurls a spear that continues if the target dies.' },
        role: 'Marksman',
        items: ['Guinsoo\'s Rageblade', 'Last Whisper', 'Hextech Gunblade']
    },
    {
        id: 'kayle',
        name: 'Kayle',
        cost: 1,
        traits: ['Wraith', 'Duelist'],
        ability: { name: 'Unleash the Demon', description: 'Attacks deal bonus magic damage that scales with Tactician level.' },
        role: 'Marksman',
        items: ['Guinsoo\'s Rageblade', 'Rapid Firecannon', 'Jeweled Gauntlet']
    },
    {
        id: 'kennen',
        name: 'Kennen',
        cost: 1,
        traits: ['Protector'],
        ability: { name: 'Eye of the Hurricane', description: 'Heals, then damages and stuns the 2 nearest enemies.' },
        role: 'Mage',
        items: ['Morellonomicon', 'Ionic Spark', 'Gargoyle Stoneplate']
    },
    {
        id: 'malphite',
        name: 'Malphite',
        cost: 1,
        traits: ['Protector'],
        ability: { name: 'Regolith Resistance', description: 'Passively gains Armor. Actively deals damage in a cone.' },
        role: 'Tank',
        items: ['Sunfire Cape', 'Gargoyle Stoneplate', 'Warmog\'s Armor']
    },
    // 2-COST
    {
        id: 'drmundo',
        name: 'Dr. Mundo',
        cost: 2,
        traits: ['Juggernaut'],
        ability: { name: 'Steel Chair Slam', description: 'Passively deals bonus damage. Actively gains max health.' },
        role: 'Fighter',
        items: ['Warmog\'s Armor', 'Sunfire Cape', 'Titan\'s Resolve']
    },
    {
        id: 'janna',
        name: 'Janna',
        cost: 2,
        traits: ['Crystal Gambit', 'Protector'],
        ability: { name: 'Crystal Chrysalis', description: 'Shields allies and fires damaging butterflies.' },
        role: 'Mage',
        items: ['Spear of Shojin', 'Morellonomicon', 'Zeke\'s Herald']
    },
    
    {
        id: 'shen',
        name: 'Shen',
        cost: 2,
        traits: ['Bastion', 'Edgelord'],
        ability: { name: 'Power Suit: Full Charge', description: 'Gains a shield. The next 3 attacks deal bonus true damage.' },
        role: 'Tank',
        items: ['Sunfire Cape', 'Gargoyle Stoneplate', 'Warmog\'s Armor']
    },
    // 3-COST
    {
        id: 'caitlyn',
        name: 'Caitlyn',
        cost: 3,
        traits: ['Battle Academia', 'Sniper'],
        ability: { name: 'Magic Bouncing Bullet', description: 'Fires a bullet that deals physical damage and bounces.' },
        role: 'Marksman',
        items: ['Infinity Edge', 'Last Whisper', 'Giant Slayer']
    },
    {
        id: 'darius',
        name: 'Darius',
        cost: 3,
        traits: ['Juggernaut', 'Edgelord'],
        ability: { name: 'Grand Guillotine', description: 'Heals, then deals physical damage. Recasts on kill.' },
        role: 'Fighter',
        items: ['Bloodthirster', 'Titan\'s Resolve', 'Infinity Edge']
    },
    {
        id: 'kogmaw',
        name: 'Kog\'Maw',
        cost: 3,
        traits: ['Monster Trainer'],
        ability: { name: 'Static Surge', description: 'Gains AP and bonus magic damage. Next attack shreds and sunders.' },
        role: 'Marksman',
        items: ['Guinsoo\'s Rageblade', 'Statikk Shiv', 'Runaan\'s Hurricane']
    },
    {
        id: 'swain',
        name: 'Swain',
        cost: 3,
        traits: ['Crystal Gambit', 'Bastion'],
        ability: { name: 'Glittering Plumage Regalia', description: 'Gains max Health and deals magic damage over time.' },
        role: 'Mage',
        items: ['Morellonomicon', 'Gargoyle Stoneplate', 'Warmog\'s Armor']
    },
    {
        id: 'yasuo',
        name: 'Yasuo',
        cost: 3,
        traits: ['Edgelord'],
        ability: { name: 'Unsheath the Storm', description: 'Deals physical damage to the 3 closest enemies.' },
        role: 'Fighter',
        items: ['Bloodthirster', 'Infinity Edge', 'Titan\'s Resolve']
    },
    // 4-COST
    {
        id: 'ashe',
        name: 'Ashe',
        cost: 4,
        traits: ['Crystal Gambit', 'Duelist'],
        ability: { name: 'Gates of Avarosa', description: 'Next 8 attacks fire bonus arrows dealing physical damage.' },
        role: 'Marksman',
        items: ['Guinsoo\'s Rageblade', 'Last Whisper', 'Infinity Edge']
    },
    {
        id: 'jinx',
        name: 'Jinx',
        cost: 4,
        traits: ['Sniper'],
        ability: { name: 'Star Rocket Blast Off!', description: 'Passively gains stacking Attack Speed. Actively deals AoE damage.' },
        role: 'Marksman',
        items: ['Guinsoo\'s Rageblade', 'Infinity Edge', 'Giant Slayer']
    },
    {
        id: 'ksante',
        name: 'K\'Sante',
        cost: 4,
        traits: ['Wraith', 'Protector'],
        ability: { name: 'Breakout Force', description: 'On first death, heals to full and gains combat stats.' },
        role: 'Tank',
        items: ['Bloodthirster', 'Titan\'s Resolve', 'Gargoyle Stoneplate']
    },
    {
        id: 'leona',
        name: 'Leona',
        cost: 4,
        traits: ['Battle Academia', 'Bastion'],
        ability: { name: 'Aegis of Unbreakable Dawn', description: 'Shields and deals AoE magic damage, stealing resistances.' },
        role: 'Tank',
        items: ['Warmog\'s Armor', 'Sunfire Cape', 'Gargoyle Stoneplate']
    },
    {
        id: 'sett',
        name: 'Sett',
        cost: 4,
        traits: ['Soul Fighter', 'Juggernaut'],
        ability: { name: 'Maximum Grit Overdrive', description: 'Heals and deals physical damage in a cone.' },
        role: 'Fighter',
        items: ['Bloodthirster', 'Titan\'s Resolve', 'Infinity Edge']
    },
    // 5-COST
    {
        id: 'braum',
        name: 'Braum',
        cost: 5,
        traits: ['Bastion'],
        ability: { name: 'El Tigre Tornado', description: 'Stuns and spins the target, dealing AoE damage and executing.' },
        role: 'Tank',
        items: ['Warmog\'s Armor', 'Bramble Vest', 'Dragon\'s Claw']
    },
    {
        id: 'gwen',
        name: 'Gwen',
        cost: 5,
        traits: ['Soul Fighter'],
        ability: { name: 'Soul Stitch / Rip The Threads', description: 'Attacks deal magic damage in a cone. Every 3rd cast hits all enemies.' },
        role: 'Mage',
        items: ['Hextech Gunblade', 'Jeweled Gauntlet', 'Rabadon\'s Deathcap']
    },

  
    {
        id: 'yone',
        name: 'Yone',
        cost: 5,
        traits: ['Edgelord'],
        ability: { name: 'Dual Blade Technique', description: 'Gains stacking stats and alternates damage types. Actively dashes and knocks up enemies.' },
        role: 'Fighter',
        items: ['Bloodthirster', 'Infinity Edge', 'Titan\'s Resolve']
    }
];

const itemsData = {
    components: [
        { id: 'bf-sword', name: 'B.F. Sword', icon: 'assets/images/items/bf-sword.png' },
        { id: 'recurve-bow', name: 'Recurve Bow', icon: 'assets/images/items/recurve-bow.png' },
        { id: 'needlessly-large-rod', name: 'Needlessly Large Rod', icon: 'assets/images/items/needlessly-large-rod.png' },
        { id: 'tear-of-the-goddess', name: 'Tear of the Goddess', icon: 'assets/images/items/tear-of-the-goddess.png' },
        { id: 'chain-vest', name: 'Chain Vest', icon: 'assets/images/items/chain-vest.png' },
        { id: 'negatron-cloak', name: 'Negatron Cloak', icon: 'assets/images/items/negatron-cloak.png' },
        { id: 'giants-belt', name: 'Giant\'s Belt', icon: 'assets/images/items/giants-belt.png' },
        { id: 'spatula', name: 'Spatula', icon: 'assets/images/items/spatula.png' },
        { id: 'sparring-gloves', name: 'Sparring Gloves', icon: 'assets/images/items/sparring-gloves.png' }
    ],
    completed: [
        { id: 'adaptive-helm', name: 'Adaptive Helm', icon: 'assets/images/items/adaptive-helm.png' },
        { id: 'archangels-staff', name: 'Archangel\'s Staff', icon: 'assets/images/items/archangels-staff.png' },
        { id: 'bastion-emblem', name: 'Bastion Emblem', icon: 'assets/images/items/bastion-emblem.png' },
        { id: 'battle-academia-emblem', name: 'Battle Academia Emblem', icon: 'assets/images/items/battle-academia-emblem.png' },
        { id: 'bloodthirster', name: 'Bloodthirster', icon: 'assets/images/items/bloodthirster.png' },
        { id: 'blue-buff', name: 'Blue Buff', icon: 'assets/images/items/blue-buff2.png' },
        { id: 'bramble-vest', name: 'Bramble Vest', icon: 'assets/images/items/bramble-vest.png' },
        { id: 'crownguard', name: 'Crownguard', icon: 'assets/images/items/crownguard.png' },
        { id: 'crystal-gambit-emblem', name: 'Crystal Gambit Emblem', icon: 'assets/images/items/crystal-gambit-emblem.png' },
        { id: 'deathblade', name: 'Deathblade', icon: 'assets/images/items/deathblade.png' },
        { id: 'dragons-claw', name: 'Dragon\'s Claw', icon: 'assets/images/items/dragons-claw.png' },
        { id: 'duelist-emblem', name: 'Duelist Emblem', icon: 'assets/images/items/duelist-emblem.png' },
        { id: 'edgelord-emblem', name: 'Edgelord Emblem', icon: 'assets/images/items/edgelord-emblem.png' },
        { id: 'edge-of-night', name: 'Edge of Night', icon: 'assets/images/items/edge-of-night.png' },
        { id: 'evenshroud', name: 'Evenshroud', icon: 'assets/images/items/evenshroud.png' },
        { id: 'executioner-emblem', name: 'Executioner Emblem', icon: 'assets/images/items/executioner-emblem1.png' },
        { id: 'gargoyle-stoneplate', name: 'Gargoyle Stoneplate', icon: 'assets/images/items/gargoyle-stoneplate.png' },
        { id: 'giant-slayer', name: 'Giant Slayer', icon: 'assets/images/items/giant-slayer.png' },
        { id: 'guinsoos-rageblade', name: 'Guinsoo\'s Rageblade', icon: 'assets/images/items/guinsoos-rageblade.png' },
        { id: 'hand-of-justice', name: 'Hand of Justice', icon: 'assets/images/items/hand-of-justice.png' },
        { id: 'heavyweight-emblem', name: 'Heavyweight Emblem', icon: 'assets/images/items/heavyweight-emblem.png' },
        { id: 'hextech-gunblade', name: 'Hextech Gunblade', icon: 'assets/images/items/hextech-gunblade.png' },
        { id: 'infinity-edge', name: 'Infinity Edge', icon: 'assets/images/items/infinity-edge.png' },
        { id: 'ionic-spark', name: 'Ionic Spark', icon: 'assets/images/items/ionic-spark.png' },
        { id: 'jeweled-gauntlet', name: 'Jeweled Gauntlet', icon: 'assets/images/items/jeweled-gauntlet.png' },
        { id: 'juggernaut-emblem', name: 'Juggernaut Emblem', icon: 'assets/images/items/juggernaut-emblem.png' },
        { id: 'krakens-fury', name: 'Kraken\'s Fury', icon: 'assets/images/items/krakensfury.png' },
        { id: 'last-whisper', name: 'Last Whisper', icon: 'assets/images/items/last-whisper.png' },
        { id: 'luchador-emblem', name: 'Luchador Emblem', icon: 'assets/images/items/luchador-emblem.png' },
        { id: 'morellonomicon', name: 'Morellonomicon', icon: 'assets/images/items/morellonomicon.png' },
        { id: 'nashors-tooth', name: 'Nashor\'s Tooth', icon: 'assets/images/items/nashors-tooth.png' },
        { id: 'prodigy-emblem', name: 'Prodigy Emblem', icon: 'assets/images/items/prodigy-emblem.png' },
        { id: 'protectors-vow', name: 'Protector\'s Vow', icon: 'assets/images/items/fimbulwinter.png' },
        { id: 'quicksilver', name: 'Quicksilver', icon: 'assets/images/items/quicksilver.png' },
        { id: 'rabadons-deathcap', name: 'Rabadon\'s Deathcap', icon: 'assets/images/items/rabadons-deathcap.png' },
        { id: 'red-buff', name: 'Red Buff', icon: 'assets/images/items/redbuff.png' },
        { id: 'sorcerer-emblem', name: 'Sorcerer Emblem', icon: 'assets/images/items/sorcerer-emblem.png' },
        { id: 'soul-fighter-emblem', name: 'Soul Fighter Emblem', icon: 'assets/images/items/soul-fighter-emblem.png' },
        { id: 'spear-of-shojin', name: 'Spear of Shojin', icon: 'assets/images/items/spear-of-shojin2.png' },
        { id: 'spirit-visage', name: 'Spirit Visage', icon: 'assets/images/items/spiritvisage.png' },
        { id: 'star-guardian-emblem', name: 'Star Guardian Emblem', icon: 'assets/images/items/star-guardian-emblem.png' },
        { id: 'steadfast-heart', name: 'Steadfast Heart', icon: 'assets/images/items/steadfast-hammer.png' },
        { id: 'steraks-gage', name: 'Sterak\'s Gage', icon: 'assets/images/items/steraks-gage.png' },
        { id: 'strategist-emblem', name: 'Strategist Emblem', icon: 'assets/images/items/strategist-emblem.png' },
        { id: 'strikers-flail', name: 'Striker\'s Flail', icon: 'assets/images/items/guardbreaker.png' },
        { id: 'sunfire-cape', name: 'Sunfire Cape', icon: 'assets/images/items/sunfire-cape.png' },
        { id: 'supreme-cells-emblem', name: 'Supreme Cells Emblem', icon: 'assets/images/items/supreme-cells-emblem.png' },
        { id: 'tacticians-cape', name: 'Tactician\'s Cape', icon: 'assets/images/items/tacticians_cape.png' },
        { id: 'tacticians-crown', name: 'Tactician\'s Crown', icon: 'assets/images/items/tacticians-crown.png' },
        { id: 'tacticians-shield', name: 'Tactician\'s Shield', icon: 'assets/images/items/tacticians_shield.png' },
        { id: 'thiefs-gloves', name: 'Thief\'s Gloves', icon: 'assets/images/items/thiefs-gloves.png' },
        { id: 'titans-resolve', name: 'Titan\'s Resolve', icon: 'assets/images/items/titans-resolve.png' },
        { id: 'void-staff', name: 'Void Staff', icon: 'assets/images/items/voidstaff.png' },
        { id: 'warmogs-armor', name: 'Warmog\'s Armor', icon: 'assets/images/items/warmogs-armor.png' },
        { id: 'wraith-emblem', name: 'Wraith Emblem', icon: 'assets/images/items/wraith-emblem.png' }
    ],
    radiant: [
        { id: 'radiant-adaptive-helm', name: 'Radiant Adaptive Helm', icon: 'assets/images/items/jak\'sho-the-protean.png' },
        { id: 'radiant-archangels-staff', name: 'Radiant Archangel\'s Staff', icon: 'assets/images/items/radiant-archangels-staff.png' },
        { id: 'radiant-bloodthirster', name: 'Radiant Bloodthirster', icon: 'assets/images/items/radiant-bloodthirster.png' },
        { id: 'radiant-blue-buff', name: 'Radiant Blue Buff', icon: 'assets/images/items/radiant-blue-buff.png' },
        { id: 'radiant-bramble-vest', name: 'Radiant Bramble Vest', icon: 'assets/images/items/radiant-bramble-vest.png' },
        { id: 'radiant-crownguard', name: 'Radiant Crownguard', icon: 'assets/images/items/royal-crownshield.png' },
        { id: 'radiant-deathblade', name: 'Radiant Deathblade', icon: 'assets/images/items/radiant-deathblade.png' },
        { id: 'radiant-dragons-claw', name: 'Radiant Dragon\'s Claw', icon: 'assets/images/items/radiant-dragons-claw.png' },
        { id: 'radiant-edge-of-night', name: 'Radiant Edge of Night', icon: 'assets/images/items/radiant-edge-of-night.png' },
        { id: 'radiant-evenshroud', name: 'Radiant Evenshroud', icon: 'assets/images/items/equinox.png' },
        { id: 'radiant-gargoyles-stoneplate', name: 'Radiant Gargoyle\'s Stoneplate', icon: 'assets/images/items/radiant-gargoyle-stoneplate.png' },
        { id: 'radiant-giant-slayer', name: 'Radiant Giant Slayer', icon: 'assets/images/items/radiant-giant-slayer.png' },
        { id: 'radiant-guinsoos-rageblade', name: 'Radiant Guinsoo\'s Rageblade', icon: 'assets/images/items/radiant-guinsoos-rageblade.png' },
        { id: 'radiant-hand-of-justice', name: 'Radiant Hand of Justice', icon: 'assets/images/items/radiant-hand-of-justice.png' },
        { id: 'radiant-hextech-gunblade', name: 'Radiant Hextech Gunblade', icon: 'assets/images/items/radiant-hextech-gunblade.png' },
        { id: 'radiant-infinity-edge', name: 'Radiant Infinity Edge', icon: 'assets/images/items/radiant-infinity-edge.png' },
        { id: 'radiant-ionic-spark', name: 'Radiant Ionic Spark', icon: 'assets/images/items/radiant-ionic-spark.png' },
        { id: 'radiant-jeweled-gauntlet', name: 'Radiant Jeweled Gauntlet', icon: 'assets/images/items/radiant-jeweled-gauntlet.png' },
        { id: 'radiant-krakens-fury', name: 'Radiant Kraken\'s Fury', icon: 'assets/images/items/radiant-krakens-fury.png' },
        { id: 'radiant-last-whisper', name: 'Radiant Last Whisper', icon: 'assets/images/items/radiant-last-whisper.png' },
        { id: 'radiant-morellonomicon', name: 'Radiant Morellonomicon', icon: 'assets/images/items/radiant-morellonomicon.png' },
        { id: 'radiant-nashors-tooth', name: 'Radiant Nashor\'s Tooth', icon: 'assets/images/items/nashors\'-tooth-radiant.png' },
        { id: 'radiant-protectors-vow', name: 'Radiant Protector\'s Vow', icon: 'assets/images/items/radiant-protectors-vow.png' },
        { id: 'radiant-quicksilver', name: 'Radiant Quicksilver', icon: 'assets/images/items/radiant-quicksilver.png' },
        { id: 'radiant-rabadons-deathcap', name: 'Radiant Rabadon\'s Deathcap', icon: 'assets/images/items/radiant-rabadons-deathcap.png' },
        { id: 'radiant-red-buff', name: 'Radiant Red Buff', icon: 'assets/images/items/redbuff_radiant.png' },
        { id: 'radiant-spear-of-shojin', name: 'Radiant Spear of Shojin', icon: 'assets/images/items/radiant-spear-of-shojin.png' },
        { id: 'radiant-spirit-visage', name: 'Radiant Spirit Visage', icon: 'assets/images/items/radiant-spirit-visage.png' },
        { id: 'radiant-steadfast-heart', name: 'Radiant Steadfast Heart', icon: 'assets/images/items/legacy-of-the-colossus.png' },
        { id: 'radiant-steraks-gage', name: 'Radiant Sterak\'s Gage', icon: 'assets/images/items/sterak\'-s-megashield.png' },
        { id: 'radiant-strikers-flail', name: 'Radiant Striker\'s Flail', icon: 'assets/images/items/stride-breaker.png' },
        { id: 'radiant-sunfire-cape', name: 'Radiant Sunfire Cape', icon: 'assets/images/items/radiant-sunfire-cape.png' },
        { id: 'radiant-thiefs-gloves', name: 'Radiant Thiefs Gloves', icon: 'assets/images/items/radiant-thiefs-gloves.png' },
        { id: 'radiant-titans-resolve', name: 'Radiant Titan\'s Resolve', icon: 'assets/images/items/radiant-titans-resolve.png' },
        { id: 'radiant-void-staff', name: 'Radiant Void Staff', icon: 'assets/images/items/radiant-void-staff.png' },
        { id: 'radiant-warmogs-armor', name: 'Radiant Warmog\'s Armor', icon: 'assets/images/items/radiant-warmogs-armor.png' }
    ],
    artifacts: [
        { id: 'blighted-jewel', name: 'Blighted Jewel', icon: 'assets/images/items/blighting-jewel1.png' },
        { id: 'dawncore', name: 'Dawncore', icon: 'assets/images/items/dawncore.png' },
        { id: 'deathfire-grasp', name: 'Deathfire Grasp', icon: 'assets/images/items/deathfire-grasp.png' },
        { id: 'deaths-defiance', name: 'Death\'s Defiance', icon: 'assets/images/items/deaths-defiance.png' },
        { id: 'fishbones', name: 'Fishbones', icon: 'assets/images/items/fishbones1.png' },
        { id: 'flickerblade', name: 'Flickerblade', icon: 'assets/images/items/flickerblade.png' },
        { id: 'gamblers-blade', name: 'Gambler\'s Blade', icon: 'assets/images/items/gamblers-blade2.png' },
        { id: 'gold-collector', name: 'Gold Collector', icon: 'assets/images/items/gold-collector.png' },
        { id: 'horizon-focus', name: 'Horizon Focus', icon: 'assets/images/items/horizon-focus1.png' },
        { id: 'hullcrusher', name: 'Hullcrusher', icon: 'assets/images/items/hullcrusher.png' },
        { id: 'indomitable-gauntlet', name: 'Indomitable Gauntlet', icon: 'assets/images/items/indomitable-gauntlet.png' },
        { id: 'infinity-force', name: 'Infinity Force', icon: 'assets/images/items/infinity-force.png' },
        { id: 'innervating-locket', name: 'Innervating Locket', icon: 'assets/images/items/innervating-locket1.png' },
        { id: 'lich-bane', name: 'Lich Bane', icon: 'assets/images/items/lich-bane1.png' },
        { id: 'lightshield-crest', name: 'Lightshield Crest', icon: 'assets/images/items/lightshield-crest1.png' },
        { id: 'ludens-tempest', name: 'Luden\'s Tempest', icon: 'assets/images/items/luden\'-s-tempest1.png' },
        { id: 'manazane', name: 'Manazane', icon: 'assets/images/items/manazane.png' },
        { id: 'mittens', name: 'Mittens', icon: 'assets/images/items/mittens1.png' },
        { id: 'moguls-mail', name: 'Mogul\'s Mail', icon: 'assets/images/items/moguls-mail2.png' },
        { id: 'prowlers-claw', name: 'Prowler\'s Claw', icon: 'assets/images/items/prowler\'-s-claw1.png' },
        { id: 'rapid-firecannon', name: 'Rapid Firecannon', icon: 'assets/images/items/rapid-firecannon1.png' },
        { id: 'seekers-armguard', name: 'Seeker\'s Armguard', icon: 'assets/images/items/seeker\'-s-armguard1.png' },
        { id: 'silvermere-dawn', name: 'Silvermere Dawn', icon: 'assets/images/items/silvermere-dawn1.png' },
        { id: 'snipers-focus', name: 'Sniper\'s Focus', icon: 'assets/images/items/snipers_focus.png' },
        { id: 'spectral-cutlass', name: 'Spectral Cutlass', icon: 'assets/images/items/spectral-cutlass1.png' },
        { id: 'statikk-shiv', name: 'Statikk Shiv', icon: 'assets/images/items/statikk-shiv.png' },
        { id: 'suspicious-trench-coat', name: 'Suspicious Trench Coat', icon: 'assets/images/items/suspicious-trench-coat1.png' },
        { id: 'talisman-of-ascension', name: 'Talisman Of Ascension', icon: 'assets/images/items/talisman-of-ascension1.png' },
        { id: 'titanic-hydra', name: 'Titanic Hydra', icon: 'assets/images/items/titanic-hydra.png' },
        { id: 'tricksters-glass', name: 'Trickster\'s Glass', icon: 'assets/images/items/tricksters-glass.png' },
        { id: 'unending-despair', name: 'Unending Despair', icon: 'assets/images/items/unending-despair1.png' },
        { id: 'wits-end', name: 'Wit\'s End', icon: 'assets/images/items/wits-end1.png' },
        { id: 'zhonyas-paradox', name: 'Zhonya\'s Paradox', icon: 'assets/images/items/zhonyas-paradox.png' }
    ]
};

const comps = [
    {
        name: "Darius Reroll",
        tier: "S",
        playstyle: "Reroll",
        difficulty: "Medium",
        avgPlace: 4.0,
        winRate: 16.2,
        champions: ["Darius", "Garen", "Aatrox", "Dr. Mundo", "Shen", "Yasuo", "Sett", "Yone"],
        traits: ["Juggernaut", "Edgelord"]
    },
    {
        name: "Kog'Maw Reroll",
        tier: "S",
        playstyle: "Reroll",
        difficulty: "Easy",
        avgPlace: 3.9,
        winRate: 17.0,
        champions: ["Kog'Maw", "Caitlyn", "Gnar", "Malphite", "Shen", "Janna", "Ashe", "Braum"],
        traits: ["Monster Trainer", "Sniper", "Protector"]
    },
    {
        name: "Soul Fighter Gwen",
        tier: "S",
        playstyle: "Standard",
        difficulty: "Medium",
        avgPlace: 4.0,
        winRate: 16.5,
        champions: ["Gwen", "Sett", "Kalista", "Shen", "Aatrox", "Yone", "Braum", "Yasuo", "Darius"],
        traits: ["Soul Fighter", "Edgelord", "Bastion"]
    },
    {
        name: "Battle Academia",
        tier: "A",
        playstyle: "Standard",
        difficulty: "Easy",
        avgPlace: 4.2,
        winRate: 14.0,
        champions: ["Garen", "Ezreal", "Caitlyn", "Leona", "Yone", "Sett", "Jinx", "Braum", "Dr. Mundo"],
        traits: ["Battle Academia", "Juggernaut", "Duelist"]
    },
    {
        name: "Wraith Duelists",
        tier: "A",
        playstyle: "Standard",
        difficulty: "Medium",
        avgPlace: 4.2,
        winRate: 14.5,
        champions: ["Kayle", "Aatrox", "Shen", "K'Sante", "Yone", "Gwen", "Ashe", "Kalista", "Yasuo"],
        traits: ["Wraith", "Duelist", "Edgelord"]
    },
    {
        name: "Crystal Gambit Ashe",
        tier: "A",
        playstyle: "Standard",
        difficulty: "Hard",
        avgPlace: 4.3,
        winRate: 13.5,
        champions: ["Ashe", "Swain", "Janna", "Garen", "Shen", "Leona", "Braum", "K'Sante", "Yone"],
        traits: ["Crystal Gambit", "Bastion", "Duelist"]
    }
];