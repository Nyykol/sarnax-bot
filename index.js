const { Client, GatewayIntentBits, Partials, EmbedBuilder, PermissionsBitField, Permissions, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionCollector, ActivityType } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent], partials: [Partials.Channel, Partials.Message] });
const schedule = require("node-schedule");
const channels = require("./json/channel.json");
const startmsg = require("./json/message.json");
const price = require("./json/price.json");
const aboutmsg = require("./json/about.json");
const payment = require("./json/payment.json");
const resell = require("./json/reseller.json");
const warranty = require("./json/warranty.json");
const rule = require("./json/rule.json");
const qna = require("./json/qna.json");
const product = require("./json/product.json");
const status = require("./json/status.json");
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

client.on("ready", async (i) => {
  client.user.setPresence({
    activities: [{ name: `CLOUD CLUB`, type: ActivityType.Watching }],
  });
  for (let id of channels.price_channel_id) {
    let channel = client.channels.cache.get(id);

    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("shop").setLabel("Check Prices !").setStyle(ButtonStyle.Success).setEmoji("<a:GRT_Money:1082002639409127454>")).addComponents(new ButtonBuilder().setCustomId("about").setLabel("About Project").setStyle(ButtonStyle.Primary).setEmoji("<a:998486907455557713:1071018447884005386>"));

    /* Start Message Embed */
    const startEmbed = new EmbedBuilder()
      .setDescription(`${startmsg.description}`)
      .setFooter({ text: `${startmsg.footer.text}`, iconURL: startmsg.footer.iconUrl })
      .setThumbnail(startmsg.thumbnail)
      .setColor(startmsg.color);

    /* Price Emebd (Button)*/
    const priceEmbed = new EmbedBuilder()
      .setTitle(`${price.title}`)
      .addFields(
        /* description */
        { name: "\u200B", value: `${price.field_description.text}` },
        { name: "\u200B", value: `${price.field_description.text1}` },
        { name: "\u200B", value: `${price.field_description.text2}` },

        /* price */
        { name: `${price.price_name.project_pv}`, value: `\`\`\`${price.price_value.project_pv.join("\n")}\`\`\``, inline: true },
        { name: `${price.price_name.source}`, value: `\`\`\`${price.price_value.source.join("\n")}\`\`\``, inline: true },
        { name: `${price.price_name.woofer}`, value: `\`\`\`${price.price_value.woofer.join("\n")}\`\`\``, inline: true },

        /* read */
        { name: `${price.price_name.read}`, value: `\`\`\`${price.price_value.read.join("\n")}\`\`\``, inline: true }
      )
      .setFooter({ text: `${price.footer.text}`, iconURL: price.footer.iconUrl })
      .setTimestamp()
      .setColor(price.color);

    /* About Embed (Button)*/
    const aboutEmbed = new EmbedBuilder().setDescription(`${aboutmsg.about_description}`).setThumbnail(aboutmsg.about_thumbnail).setColor(aboutmsg.color);

    channel.bulkDelete(1, true);
    channel.send({ embeds: [startEmbed], components: [row] });

    client.on("interactionCreate", async (interaction) => {
      const checkdm = new EmbedBuilder().setTitle("`CLOUD CLUB`").setColor("FF0000").setDescription(`**__CHECK DM__:** ${interaction.user}\n\n<a:1040617366721146880:1071018206803795998> The price has already been sent to you.`).setThumbnail("https://cdn.discordapp.com/attachments/986721372451504179/1062791167852421281/output-onlinegiftools_6.gif");
      if (interaction.customId === "shop") {
        try {
          await interaction.reply({ embeds: [checkdm], ephemeral: true });
          interaction.user.send({ embeds: [priceEmbed], ephemeral: true });
        } catch (error) {}
      }
      if (interaction.customId === "about") {
        try {
          await interaction.reply({ embeds: [checkdm], ephemeral: true });
          interaction.user.send({ embeds: [aboutEmbed], ephemeral: true });
        } catch (error) {}
      }
    });
  }

  /* Warranty */
  for (let id of channels.warranty) {
    let channel = client.channels.cache.get(id);

    /* Warranty Embed Message*/
    const warrantyEmbed = new EmbedBuilder()
      .setTitle(`${warranty.title}`)
      .setDescription(`${warranty.description}`)
      .setFooter({ text: `${warranty.footer.text}`, iconURL: warranty.footer.icon_url })
      .setColor(warranty.color)
      .setTimestamp();

    channel.bulkDelete(1, true);
    channel.send({ embeds: [warrantyEmbed] });
  }

  /* Resell */
  for (let id of channels.resell) {
    let channel = client.channels.cache.get(id);

    /* Reseller Embed Message*/
    const resellEmbed = new EmbedBuilder()
      .setTitle(`${resell.title}`)
      .setDescription(`${resell.description}`)
      .setFooter({ text: `${resell.footer.text}`, iconURL: resell.footer.icon_url })
      .setColor(resell.color)
      .setTimestamp();

    channel.send({ embeds: [resellEmbed] });
    channel.bulkDelete(1, true);
  }

  /* Payment */
  for (let id of channels.payment) {
    let channel = client.channels.cache.get(id);

    /* Payment Message Embed */
    const paymentEmbed = new EmbedBuilder()
      .setTitle(`${payment.title}`)
      .setDescription(`${payment.description}`)
      .setFooter({ text: `${payment.footer.text}`, iconURL: payment.footer.icon_url })
      .setColor(payment.color)
      .setTimestamp();

    channel.bulkDelete(1, true);
    channel.send({ embeds: [paymentEmbed] });
  }

  /* Rule */
  for (let id of channels.rule) {
    let channel = client.channels.cache.get(id);

    /* Rule Message Embed */
    const ruleEmbed = new EmbedBuilder().setDescription(`${rule.description}`).setColor(rule.color).setThumbnail(rule.thumbnail);

    channel.bulkDelete(1, true);
    channel.send({ embeds: [ruleEmbed] });
  }

  /* Faq */
  for (let id of channels.qna) {
    let channel = client.channels.cache.get(id);

    /* Qna Message Embed */
    const qnaEmbed = new EmbedBuilder().setDescription(`${qna.description}`).setColor(qna.color).setThumbnail(qna.thumbnail);

    channel.bulkDelete(1, true);
    channel.send({ embeds: [qnaEmbed] });
  }

  /* Product */
  for (let id of channels.product) {
    let channel = client.channels.cache.get(id);

    /* Product Message Embed */
    const productEmbed = new EmbedBuilder().setDescription(`${product.description}`).setColor(product.color);

    channel.bulkDelete(1, true);
    channel.send({ embeds: [productEmbed] });
  }

  /* status */
  for (let id of channels.status) {
    let channel = client.channels.cache.get(id);

    /* Product Message Embed */
    const statusEmbed = new EmbedBuilder()
      .setTitle("`Status`")
      .setDescription(`・Project Private: <a:check:986694533662265445>\n・Loader: <a:check:986694533662265445>\n・Activate: Do /Login in <#986716807106805762>\n\n**Last update**:` + dd + "/" + mm)
      .setColor(status.color)
      .setThumbnail("https://cdn.discordapp.com/attachments/986721372451504179/1062791167852421281/output-onlinegiftools_6.gif")
      .setFooter({ text: `Data Update Status!`, iconURL: `https://cdn.discordapp.com/attachments/986721372451504179/1062791167852421281/output-onlinegiftools_6.gif` })
      .setTimestamp();

    const hiMessage = () => {
      // Replace CHANNEL_ID with the ID of the Discord channel you want to send the message to

      // Send the "hi" message to the channel
      channel.bulkDelete(1, true);
      channel.send({ embeds: [statusEmbed] });
    };
    schedule.scheduleJob("* * 24 * * *", hiMessage);
  }

  try {
    console.log(`Successful send to ${channel.name}`);
  } catch {
    console.log("error");
  }
});

client.login("MTA3MjU3MDAxNTc4MzYwMDI5MA.GW49Sc.ny0MDI4u9Xr7KH2QZw8ujk62ZB8O0GLHXBS-fE");
