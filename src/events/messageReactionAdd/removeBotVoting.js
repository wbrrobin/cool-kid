module.exports = async (client, reaction) => {
    try {
        // Wenn die Reaktion außerhalb des Caches liegt, fülle sie.
        if (reaction.partial) {
            await reaction.fetch();
        }

        if (!reaction.message.author.bot) {
            return; // Nachricht wurde nicht vom Bot gesendet, nichts zu tun.
        }

        // WICHTIG: Prüfe, ob der reagierende Benutzer der Bot selbst ist.
        if (reaction.count === 1) {
            // Der Bot hat reagiert. Prüfe, ob es eine der Abstimmungs-Reaktionen ist.
            // Wenn die Reaktion vom Bot stammt UND die Reaktion ✅ oder ❌ ist,
            // nehmen wir an, dass dies der initiale Bot-Add war, und tun nichts.
            return;
        }

        // Wenn der reagierende Benutzer NICHT der Bot ist (also ein echter User), 
        // dann entfernen wir die Reaktion des Bots.

        const validEmojis = ['✅', '🔁', '❌'];

        // Gehe alle Reaktionen des Bots durch, die entfernt werden sollen
        const emoji = reaction._emoji.name;
        if (validEmojis.includes(emoji)) {
            const botReaction = reaction.message.reactions.cache.get(emoji).users.cache.get(client.user.id);

            // Prüfen, ob der Bot diese spezifische Reaktion hinzugefügt hat
            if (botReaction) {
                // Entferne die spezifische Reaktion des Bots
                await reaction.message.reactions.cache.get(emoji).users.remove(client.user.id);
            }
        }
    } catch (error) {
        console.log(error);
    }
};