const Discord = require('discord.js');
const client = new Discord.Client();

//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log('Bot lancé')
})

// Répondre à un message
client.on("message", function (message) {
    // On récupère tous les textes correspondant à !XdX
    msgs = message.content.match(/![0-9]*d[0-9]*/gm)

    // Si aucun texte de correspond, on sort de la function
    if(msgs == null)
        return

    var lance = ''

    msgs.forEach((e) => {
        // On supprime le ! afin d'obtenir XdX
        msg = e.slice(1)
        // On sépare notre chaine en deux afin d'avoir le nombre de dé et le type de dé
        msg = msg.split('d')
        var diceAmount = msg[0] 
        var diceType = msg[1]
        // Si le nombre de dé n'a pas été pricisé on le set à 1
        if(diceAmount == '')
            diceAmount = 1
        // On effectue nos lancés
        rolls = [];
        for(var i = 0; i < diceAmount; i++)
            rolls.push(Math.floor(Math.random() * diceType) + 1)

        lance += `\n${diceAmount}d${diceType} => [(${rolls.join(' ')})]`
    })

    if(`**From <@${message.author.id}>**\n\`\`\`${lance}\`\`\``.length < 2000) {
        message.channel.send(`**From <@${message.author.id}>**\n\`\`\`${lance}\`\`\``)
    } else {
        var fs = require('fs');

        fs.writeFile('./output.txt', lance, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        message.channel.send(`**From <@${message.author.id}>**`, { files: ['./output.txt'] })
    }
})

client.login('ODMxMjgyMDk4NDYyNTIzNDYy.YHS9yA.TsBSe-aysrMV_LcrnIFHJWiMT-8');