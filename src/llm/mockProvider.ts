import type { ReadingRequest } from './provider';
import {
  BlockedError,
  NetworkError,
  RateLimitedError,
  TimeoutError,
  mapError,
} from './provider';

// ─── Canned readings ──────────────────────────────────────────

const CANNED_EN = `## 1. Current Energy & Life Phase

Dear Friend, the energy around you right now speaks of a period of introspection and quiet transformation. You may be noticing a subtle shift in how you perceive your daily routines and relationships. This suggests a natural turning point — not dramatic, but meaningful.

## 2. Card-by-Card Interpretation

**Position 1 — Current Situation: The Star (Upright)**
The Star illuminates your present with hope and renewed purpose. After recent challenges, this card suggests you are finding your way back to a sense of calm clarity. Its presence here indicates that healing is actively underway, even if progress feels slow.

**Position 2 — Challenge or Hidden Factor: Five of Cups (Reversed)**
Reversed, the Five of Cups suggests you are beginning to release old grief or disappointment. The hidden factor here is that lingering regret may still cloud your judgment on occasion. This card encourages you to look at what remains rather than what was lost.

**Position 3 — Guidance: The Empress (Upright)**
The Empress in the guidance position invites you to nurture yourself and your creative impulses. She suggests that abundance comes through patience and self-care, not force. Ground yourself in what brings you genuine comfort and joy.

*The Star and The Empress together create a powerful current of renewal and abundance, while the reversed Five of Cups indicates the final release of old emotional patterns that no longer serve you.*

## 3. Do's: What to Focus On

- Practice daily moments of gratitude, even for small things
- Invest time in creative activities that bring you peace
- Reach out to someone you trust for a heartfelt conversation
- Set one small, achievable goal this week to build momentum

## 4. Don'ts: What to Avoid

- Avoid dwelling on past disappointments — the cards show you are moving beyond them
- Do not rush important decisions; let clarity emerge naturally
- Resist the urge to compare your journey with others
- Avoid neglecting your physical well-being during this emotional transition

## 5. Overall Guidance

This reading suggests you are at a beautiful threshold. The universe mirrors back your resilience and capacity for renewal. Trust the process, tend to yourself with the same care you would offer a dear friend, and allow the next chapter to unfold at its own pace. You have already done the hardest part — choosing to look forward.`;

const CANNED_VI = `## 1. Năng lượng hiện tại & giai đoạn cuộc sống

Bạn thân mến, năng lượng xung quanh bạn lúc này cho thấy một giai đoạn nội tâm và chuyển hóa nhẹ nhàng. Bạn có thể đang nhận ra sự thay đổi tinh tế trong cách bạn nhìn nhận các mối quan hệ và thói quen hàng ngày. Điều này gợi ý một bước ngoặt tự nhiên — không quá kịch tính, nhưng đầy ý nghĩa.

## 2. Giải nghĩa từng lá bài

**Vị trí 1 — Tình trạng hiện tại: Ngôi Sao (The Star) — Thuận**
Ngôi Sao (The Star) soi sáng hiện tại của bạn bằng hy vọng và mục đích mới. Sau những thử thách gần đây, lá bài này gợi ý rằng bạn đang tìm lại sự bình yên và sáng suốt. Sự hiện diện của nó cho thấy quá trình chữa lành đang diễn ra, dù tiến trình có thể cảm thấy chậm.

**Vị trí 2 — Thử thách hoặc yếu tố tiềm ẩn: Năm Cốc (Five of Cups) — Ngược**
Ngược chiều, Năm Cốc (Five of Cups) cho thấy bạn đang bắt đầu buông bỏ nỗi buồn hay thất vọng cũ. Yếu tố ẩn ở đây là những nuối tiếc còn sót lại đôi khi vẫn ảnh hưởng đến phán đoán của bạn. Lá bài này khuyến khích bạn nhìn vào những gì còn lại thay vì những gì đã mất.

**Vị trí 3 — Lời khuyên định hướng: Hoàng Hậu (The Empress) — Thuận**
Hoàng Hậu (The Empress) ở vị trí hướng dẫn mời bạn chăm sóc bản thân và nuôi dưỡng sự sáng tạo. Bà gợi ý rằng sự sung túc đến từ kiên nhẫn và tự chăm sóc, không phải từ sự ép buộc.

*Ngôi Sao và Hoàng Hậu cùng tạo nên một dòng năng lượng tái sinh mạnh mẽ, trong khi Năm Cốc ngược cho thấy sự giải phóng cuối cùng khỏi những mô thức cảm xúc cũ.*

## 3. Nên làm

- Thực hành lòng biết ơn hàng ngày, ngay cả với những điều nhỏ nhất
- Dành thời gian cho các hoạt động sáng tạo mang lại bình yên
- Liên hệ với người bạn tin tưởng để trò chuyện từ trái tim
- Đặt một mục tiêu nhỏ, khả thi trong tuần này để tạo đà

## 4. Nên tránh

- Tránh suy nghĩ mãi về những thất vọng trong quá khứ — các lá bài cho thấy bạn đang vượt qua chúng
- Không vội vàng đưa ra quyết định quan trọng; hãy để sự sáng suốt đến một cách tự nhiên
- Tránh so sánh hành trình của mình với người khác
- Không bỏ quên sức khỏe thể chất trong giai đoạn chuyển đổi cảm xúc này

## 5. Lời khuyên tổng quan

Bài đọc này cho thấy bạn đang ở một ngưỡng cửa tươi đẹp. Vũ trụ phản chiếu lại sự kiên cường và khả năng tái sinh của bạn. Hãy tin vào quá trình, chăm sóc bản thân với sự ân cần như bạn dành cho một người bạn thân yêu, và để chương tiếp theo mở ra theo nhịp độ riêng. Bạn đã làm được phần khó nhất rồi — đó là chọn nhìn về phía trước.`;

// ─── Helpers ───────────────────────────────────────────────────

function getMockMode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get('mock');
  } catch {
    return null;
  }
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    signal.addEventListener('abort', onAbort, { once: true });
  });
}

// ─── Mock Provider ─────────────────────────────────────────────

export function createMockProvider(): {
  generateReading: (
    req: ReadingRequest,
    signal: AbortSignal,
  ) => AsyncIterable<string>;
} {
  return {
    async *generateReading(req, signal) {
      const mockMode = getMockMode();

      // Simulate errors based on URL param
      if (mockMode === '429') {
        await sleep(300, signal);
        throw new RateLimitedError('Mock: Rate limited (429)');
      }
      if (mockMode === 'blocked') {
        await sleep(300, signal);
        throw new BlockedError('Mock: Content blocked by safety filters');
      }
      if (mockMode === 'timeout') {
        await sleep(300, signal);
        throw new TimeoutError('Mock: Request timed out');
      }
      if (mockMode === 'network') {
        await sleep(300, signal);
        throw new NetworkError('Mock: Network error');
      }

      const canned = req.language === 'vi' ? CANNED_VI : CANNED_EN;

      // Stream in random-sized chunks with random delays
      let offset = 0;
      while (offset < canned.length) {
        if (signal.aborted) {
          throw mapError(new DOMException('Aborted', 'AbortError'));
        }

        const chunkSize = Math.floor(Math.random() * 40) + 5;
        const chunk = canned.slice(offset, offset + chunkSize);
        offset += chunkSize;

        yield chunk;

        const delay = Math.floor(Math.random() * 50) + 10;
        await sleep(delay, signal);
      }
    },
  };
}
