// import { Webhook, MessageBuilder } from 'discord-webhook-node';
// import {
//   DISCORD_WEBHOOK_URL,
//   LUNCH_IMAGE,
// } from './const/lunch-recommendation.const';

/**
 * @todo 추후 테스트 코드 작성을 위해 주석처리
 */
// const hook = new Webhook(DISCORD_WEBHOOK_URL);

// hook.setUsername('Lunch-Recommendation');

describe('sendWebhookApiTest', () => {
  it('', () => {});
  // test('sendWebhookApiTest', () => {
  //   const embed = new MessageBuilder()
  //     .setTitle('오늘의 점심 추천 리스트')
  //     .setAuthor('Lunch-Recommendation', LUNCH_IMAGE)
  //     .setThumbnail(LUNCH_IMAGE)
  //     .setDescription('카테고리 1\n  식당 1, 식당 2, 식당 3\n...')
  //     .setTimestamp();

  //   // 웹훅으로 메시지를 비동기적으로 전송
  //   hook
  //     .send(embed)
  //     .then(() => {
  //       console.log('Webhook sent successfully.');
  //     })
  //     .catch((error) => {
  //       console.error('Error sending webhook:', error);
  //     });
  // });
});
