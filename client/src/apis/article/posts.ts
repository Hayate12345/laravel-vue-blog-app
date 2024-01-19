/**
 * 公開記事一覧を取得するためのAPIにリクエストを送信します
 * @param {number} page - 取得するページ番号
 * @returns {Promise<Object>} APIからのレスポンス
 * @throws {Error} レスポンスが正常でない場合やAPIリクエスト中にエラーが発生した場合
 */
export async function getPublishedArticle(page: number) {
  try {
    const apiUrl = `http://127.0.0.1:8000/api/article/get_published_article?page=${page}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { error: { message: `APIリクエストが失敗しました。 ${response}` } };
    }

    return await response.json();
  } catch (error) {
    return { error: { message: 'APIリクエスト中にエラーが発生しました。' } };
  }
}

/**
 * 公開記事一覧を取得するためのAPIにリクエストを送信します
 * @param {any} slug - 取得するページ番号
 * @returns {Promise<Object>} APIからのレスポンス
 * @throws {Error} レスポンスが正常でない場合やAPIリクエスト中にエラーが発生した場合
 */
export async function getArticle(slug: any) {
  try {
    const apiUrl = `http://127.0.0.1:8000/api/article/get_article/${slug}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (response.status === 500) {
      return { internalServerError: { message: responseData.message } };
    }

    if (response.status === 404) {
      return { notFoundError: { message: responseData.message } };
    }

    return await responseData;
  } catch (error) {
    return { internalServerError: { message: 'APIリクエスト中にエラーが発生しました。' } };
  }
}

/**
 * 記事データを保存するAPIにリクエストを送信します
 * @param {string} adminId - 保存する管理者ID
 * @param {string} title - 保存する記事タイトル
 * @param {string} content - 保存する記事内容
 * @param {string} featuredImage - 保存する記事画像
 * @param {string} metaDescription - 保存する記事画像
 * @param {boolean} publicStatus - 公開するかしないかのパラメータ
 * @returns {Promise<Object>} APIからのレスポンス
 * @throws {Error} レスポンスが正常でない場合やAPIリクエスト中にエラーが発生した場合
 */
export async function submitArticle(adminId: string, title: string, content: string, featuredImage: File, metaDescription: string, publicStatus: boolean) {
  try {
    const apiUrl = `http://127.0.0.1:8000/api/article/submit_article`;

    const formData = new FormData();
    formData.append('adminId', adminId)
    formData.append('title', title)
    formData.append('featuredImage', featuredImage)
    formData.append('content', content)
    formData.append('metaDescription', metaDescription)
    formData.append('publicStatus', publicStatus ? '1' : '0')

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      body: formData,
    });

    const responseData = await response.json();

    if (response.status === 500) {
      return { internalServerError: { message: responseData.message } };
    }

    return await responseData;
  } catch (error) {
    return { internalServerError: { message: 'APIリクエスト中にエラーが発生しました。' } };
  }
}
