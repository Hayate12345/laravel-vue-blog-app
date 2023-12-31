<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class sessionsController extends Controller
{
    /**
     * ユーザ認証する
     * @access public
     * @param Illuminate\Http\Request $request
     * @return JSON
     * @throws Exception データベースクエリの実行中にエラーが発生した場合
     */
    public function store(Request $request)
    {
        try {
            $email = $request->input('email');
            $password = $request->input('password');
            $user = Admin::where('email', $email)->first();

            if ($user && Hash::check($password, $user->password)) {
                $token = $user->createToken('AccessToken')->plainTextToken;

                return response()->json([
                    'token' => $token,
                    'notice' => 'ログインに成功しました。'
                ], 200);
            } else {
                return response()->json([
                    'alert' => 'ログインに失敗しました。'
                ], 401);
            }
        } catch (Exception) {
            return response()->json([
                'alert' => 'サーバー内でエラーが発生しました。'
            ], 500);
        }
    }

    /**
     * ログインした管理者情報を取得する
     * @access public
     * @param Illuminate\Http\Request $request
     * @return JSON
     * @throws Exception データベースクエリの実行中にエラーが発生した場合
     */
    public function show(Request $request)
    {
        return response()->json([
            'admin' => $request->user()
        ]);
    }

    /**
     * ログイン時に発行したトークンを削除する
     * @access public
     * @param Illuminate\Http\Request $request
     * @return JSON
     * @throws Exception データベースクエリの実行中にエラーが発生した場合
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'notice' => 'ログアウトしました。'
        ], 200);
    }
}
