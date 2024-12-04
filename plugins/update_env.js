const { updateEnv, readEnv } = require('../lib/database');
const EnvVar = require('../lib/mongodbenv');
const { cmd } = require('../command');

cmd({
  pattern: "update",
  react: "🪄",
  alias: ["updateenv"],
  desc: "Check and update environment variables",
  category: "owner",
  filename: __filename,
}, async (conn, mek, m, { from, q, reply, isOwner }) => {
  if (!isOwner) return;

  if (!q) {
    return reply("🙇‍♂️ *Please provide the environment variable and its new value.* \n\nExample: `.update ALIVE_MSG: ʜᴇʟʟᴏ ɪ ᴀᴍ sɪʟᴇɴᴛ ʟᴏᴠᴇʀ⁴³²`");
  }

  try {
    const colonIndex = q.indexOf(':');
    const commaIndex = q.indexOf(',');
    const delimiterIndex = colonIndex !== -1 ? colonIndex : commaIndex;

    if (delimiterIndex === -1) {
      return reply("🫠 *Invalid format. Please use the format:* `.update KEY:VALUE`");
    }

    const key = q.substring(0, delimiterIndex).trim();
    const value = q.substring(delimiterIndex + 1).trim();

    const parts = value.split(/\s+/).filter(part => part.trim());
    const newValue = value;
    const mode = parts.length > 1 ? parts.slice(1).join(' ').trim() : '';

    const validModes = ['public', 'private', 'groups', 'inbox'];
    const finalMode = validModes.includes(mode) ? mode : '';

    if (!key || !newValue) {
      return reply("🫠 *Invalid format. Please use the format:* `.update KEY:VALUE`");
    }

    if (key === 'MODE' && !validModes.includes(newValue)) {
      return reply(`😒 *Invalid mode. Valid modes are: ${validModes.join(', ')}*`);
    }

    if (key === 'ALIVE_IMG' && !newValue.startsWith('https://')) {
      return reply("😓 *Invalid URL format. PLEASE GIVE ME IMAGE URL*");
    }

    if (key === 'AUTO_READ_STATUS' && !['true', 'false'].includes(newValue)) {
      return reply("😓 *Invalid value for AUTO_READ_STATUS. Please use `true` or `false`.*");
    }

    const envVar = await EnvVar.findOne({ key: key });

    if (!envVar) {
      const allEnvVars = await EnvVar.find({});
      const envList = allEnvVars.map(env => `${env.key}: ${env.value}`).join('\n');
      return reply(`❌ *The environment variable ${key} does not exist.*\n\n*Here are the existing environment variables:*\n\n${envList}`);
    }

    await updateEnv(key, newValue, finalMode);
    reply(`✅ *Environment variable updated.*\n\n🗃️ *${key}* ➠ ${newValue} ${finalMode ? `\n*Mode:* ${finalMode}` : ''}`);
  } catch (err) {
    console.error('Error updating environment variable:' + err.message);
    reply("🙇‍♂️ *Failed to update the environment variable. Please try again.*" + err);
  }
});
