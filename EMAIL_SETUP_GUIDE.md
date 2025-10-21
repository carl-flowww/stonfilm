# Contact Form 이메일 알림 설정 가이드 (완전 무료)

이 가이드는 Contact 폼 제출 시 자동으로 이메일 알림을 받을 수 있도록 설정하는 방법을 설명합니다.

**무료 제공량: 월 3,000통 이메일** (EmailJS 대비 15배 더 많음)

## 1. Resend 계정 설정 (완전 무료)

### 1.1 Resend 가입
1. [Resend](https://resend.com)에 접속하여 회원가입
2. **무료 플랜: 월 3,000통, 일 100통까지 영구 무료**

### 1.2 API Key 생성
1. Resend 대시보드에서 **API Keys** 메뉴로 이동
2. **Create API Key** 클릭
3. 이름: `stonfilm-contact-notifications`
4. API Key 복사 (한 번만 표시되므로 안전한 곳에 보관)

### 1.3 도메인 인증 (선택사항, 프로덕션용)
테스트 단계에서는 `onboarding@resend.dev`를 발신자로 사용 가능합니다.

프로덕션에서 커스텀 도메인을 사용하려면:
1. Resend 대시보드에서 **Domains** 메뉴로 이동
2. 도메인 추가 및 DNS 레코드 설정
3. 인증 완료 후 `contact@stonfilm.com` 같은 커스텀 발신자 사용 가능

## 2. Supabase Edge Function 배포

### 2.1 Supabase CLI 로그인
```bash
supabase login
```

### 2.2 프로젝트 연결
```bash
supabase link --project-ref fhaulipfxghmgmoytleh
```

### 2.3 환경 변수 설정
Resend API Key를 Supabase Secrets에 저장:
```bash
supabase secrets set RESEND_API_KEY=re_your_api_key_here
```

### 2.4 Edge Function 배포
```bash
supabase functions deploy send-contact-email
```

### 2.5 배포 확인
```bash
supabase functions list
```

## 3. Database Webhook 설정

Supabase Dashboard에서 설정:

1. **Database > Webhooks** 메뉴로 이동
2. **Create a new webhook** 클릭
3. 다음 정보 입력:
   - **Name**: `contact-email-notification`
   - **Table**: `contact_submissions`
   - **Events**: `Insert` 체크
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: `https://fhaulipfxghmgmoytleh.supabase.co/functions/v1/send-contact-email`
   - **HTTP Headers**:
     ```
     Authorization: Bearer YOUR_SUPABASE_ANON_KEY
     Content-Type: application/json
     ```
4. **Create webhook** 클릭

## 4. 이메일 수신자 변경

### 테스트 단계 (현재)
- 수신자: `makeyourriver@naver.com`

### 프로덕션 단계
Edge Function 코드에서 수신자 변경:

```typescript
// supabase/functions/send-contact-email/index.ts
const NOTIFICATION_EMAIL = 'song41@stonfilm.com'; // 변경
```

변경 후 다시 배포:
```bash
supabase functions deploy send-contact-email
```

## 5. 테스트

### 5.1 로컬 테스트
```bash
# Edge Function 로컬 실행
supabase functions serve send-contact-email

# 테스트 데이터 전송
curl -X POST http://localhost:54321/functions/v1/send-contact-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "INSERT",
    "record": {
      "id": "test-id",
      "company": "Test Company",
      "full_name": "Test User",
      "email": "test@example.com",
      "phone": "010-1234-5678",
      "message": "This is a test message",
      "submitted_at": "2025-10-21T08:00:00Z"
    }
  }'
```

### 5.2 프로덕션 테스트
1. http://localhost:8000 또는 배포된 사이트에서 Contact 폼 제출
2. `makeyourriver@naver.com`에서 이메일 수신 확인
3. Supabase Dashboard > Edge Functions > Logs에서 로그 확인

## 6. 트러블슈팅

### 이메일이 오지 않는 경우

1. **Edge Function 로그 확인**
   ```bash
   supabase functions logs send-contact-email
   ```

2. **Webhook 로그 확인**
   - Supabase Dashboard > Database > Webhooks
   - 해당 webhook 클릭 > Recent deliveries 확인

3. **Resend 로그 확인**
   - Resend Dashboard > Emails
   - 전송 상태 및 에러 메시지 확인

4. **스팸 폴더 확인**
   - 첫 이메일은 스팸으로 분류될 수 있음

### 일반적인 오류

- `401 Unauthorized`: Webhook Authorization 헤더 확인
- `API key not found`: Supabase Secrets 설정 확인
- `Rate limit exceeded`: Resend 무료 플랜 제한 초과

## 7. 비용 및 제한사항 (완전 무료!)

### Resend 무료 플랜
- ✅ **월 3,000통** (EmailJS 대비 15배 더 많음)
- ✅ 일 100통
- ✅ 영구 무료
- ⚠️ 발신자: `onboarding@resend.dev` (테스트용, 프로덕션에서는 도메인 인증 필요)

### Supabase Edge Functions
- ✅ 무료 플랜: 월 500,000회 호출
- ✅ 2GB 아웃바운드 전송
- ✅ 영구 무료

### 다른 무료 서비스 비교

| 서비스 | 무료 이메일/월 | 일일 제한 | 영구 무료 |
|--------|----------------|-----------|-----------|
| **Resend** | **3,000통** ⭐ | 100통 | ✅ |
| EmailJS | 200통 | - | ✅ |
| SendGrid | 100통 | - | ✅ |
| Mailgun | 100통 (3개월) | - | ❌ |

**결론: Resend가 가장 많은 무료 이메일을 제공합니다!**

랜딩페이지 Contact 폼 용도로는 월 3,000통이면 충분하며, 완전 무료로 운영 가능합니다.

## 8. 다음 단계

프로덕션 배포 시:
1. Resend에서 도메인 인증
2. 커스텀 발신자 주소 설정 (`contact@stonfilm.com`)
3. 이메일 템플릿 개선
4. 자동 응답 이메일 추가 (제출자에게 확인 메일 전송)
