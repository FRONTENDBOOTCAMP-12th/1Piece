import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

serve(async (req) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (req.method === 'OPTIONS') return new Response('ok', { headers });

  try {
    const { userId } = await req.json();
    console.log('[delete-user] userId:', userId);

    const supabase = createClient(
      Deno.env.get('SB_URL')!,
      Deno.env.get('SB_SERVICE_ROLE_KEY')!
    );

    // DB users 테이블에서 삭제
    const { error: rpcError } = await supabase.rpc('delete_user_data', {
      target_user_id: userId,
    });

    if (rpcError) {
      console.error('[delete-user] RPC Error:', rpcError);
    }

    // Supabase Auth 유저 삭제
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      console.error('[delete-user] Auth Delete Error:', authError);
    }

    if (rpcError || authError) {
      return new Response(
        JSON.stringify({ success: false, message: '탈퇴 실패' }),
        { status: 500, headers }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error('[delete-user] Unexpected Error:', err);
    return new Response(
      JSON.stringify({ success: false, message: '서버 에러 발생' }),
      { status: 500, headers }
    );
  }
});
