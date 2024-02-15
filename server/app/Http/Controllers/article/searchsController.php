<?php

namespace App\Http\Controllers\article;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Tag;

class searchsController extends Controller
{
    /**
     * 記事を検索し、検索結果をレスポンスで返す
     * @access public
     * @param Illuminate\Http\Request $request
     * @return Json
     * @throws Exception データベースから検索結果を取得する際にエラーが発生した場合
     */
    public function getArticleSearchResult(Request $request)
    {
        try {
            $keyword = $request->input('keyword');
            $articles = Article::query()->where('public_status', 1)->where('title', 'like', '%' . $keyword . '%')->paginate(12);

            return response()->json([
                'articles' => $articles
            ], 200);
        } catch (Exception) {
            return response()->json([
                'message' => 'サーバ内でエラーが発生しました。'
            ], 500);
        }
    }
}
