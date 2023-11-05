import { Webhook, MessageBuilder } from 'discord-webhook-node';

const hook = new Webhook(
  'https://discord.com/api/webhooks/1170568748843946124/9aDOCN1W66q8oRlef-mvlpKOoIBLMbSo2WFycqt22xnY8DjEh1cIlF3q2P3fOTIbV7aI',
);

hook.setUsername('Lunch-Recommendation');

describe('sendWebhookApiTest', () => {
  test('sendWebhookApiTest', () => {
    const embed = new MessageBuilder()
      .setTitle('오늘의 점심 추천 리스트')
      .setAuthor(
        'Lunch-Recommendation',
        'https://cdn-icons-png.flaticon.com/512/7662/7662446.png',
      )
      .setThumbnail('https://cdn-icons-png.flaticon.com/512/7662/7662446.png')
      .setDescription('카테고리 1\n  식당 1, 식당 2, 식당 3\n...')
      .setTimestamp();

    // 웹훅으로 메시지를 비동기적으로 전송
    hook
      .send(embed)
      .then(() => {
        console.log('Webhook sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending webhook:', error);
      });
  });
});
