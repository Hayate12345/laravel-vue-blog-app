/**
 * お問い合わせを保存するためのAPIにリクエストを送信します
 * @param {string} name 送信する名前
 * @param {string} email 送信するメールアドレス
 * @param {string} category 送信するカテゴリー
 * @param {string} content 送信するお問い合わせ内容
 * @returns {Promise<Object>} APIからのレスポンス
 * @throws {Error} レスポンスが正常でない場合やAPIリクエスト中にエラーが発生した場合
 */
export async function submitContact(name: string, email: string, category: string, content: string) {
  try {
    const apiUrl = `http://127.0.0.1:8000/api/contact/submit_contact`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        category: category,
        content: content,
      }),
    });

    const responseData = await response.json();

    if (response.status === 500) {
      return { internalServerError: { message: responseData.message } };
    }

    if (response.status === 409) {
      return { ConflictError: { message: responseData.message } };
    }

    return await responseData;
  } catch (error) {
    return { internalServerError: { message: 'APIリクエスト中にエラーが発生しました。' } };
  }
}
