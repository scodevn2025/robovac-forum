import "dotenv/config";
import { PrismaClient, Role, GeoFlag } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ARTICLES = [
  // === REVIEWS ===
  {
    title: "Roborock S8 MaxV Ultra vs Dreame X40 Ultra — So sánh chi tiết 2 flagship robot hút bụi 2026",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Tổng quan" }] },
        { type: "paragraph", content: [{ type: "text", text: "Sau 2 tuần test thực tế cả 2 flagship đến từ 2 thương hiệu dẫn đầu thị trường robot hút bụi, mình sẽ so sánh chi tiết từng hạng mục. Roborock S8 MaxV Ultra (giá ~1.499$) vs Dreame X40 Ultra (giá ~1.299$). Cùng xem đâu mới là lựa chọn tốt nhất cho gia đình bạn." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "1. Lực hút — Dreame thắng" }] },
        { type: "paragraph", content: [{ type: "text", text: "Roborock S8 MaxV Ultra: 10.000Pa | Dreame X40 Ultra: 12.000Pa. Trên thực tế, cả 2 đều dư sức hút sạch mọi loại sàn. Tuy nhiên với thảm dày, X40 Ultra cho thấy sự vượt trội nhẹ nhờ lực hút mạnh hơn 20%. Bụi mịn trên thảm lông được hút sạch hơn hẳn." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "2. Lau nhà — Dreame thắng áp đảo" }] },
        { type: "paragraph", content: [{ type: "text", text: "Đây là điểm khác biệt lớn nhất. X40 Ultra dùng 2 miếng lau xoay tròn (200 vòng/phút) kèm cần gạt mở rộng ra mép tường. S8 MaxV Ultra dùng miếng lau rung Sonic (4.000 lần/phút). Kết quả: vết bẩn khô như cà phê, nước sốt — X40 Ultra lau sạch hoàn toàn sau 2 lần, S8 cần 3-4 lần. Đặc biệt, X40 Ultra lau sát mép tường tốt hơn hẳn nhờ cần gạt mở rộng." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "3. Né vật cản — Roborock thắng" }] },
        { type: "paragraph", content: [{ type: "text", text: "S8 MaxV Ultra trang bị camera RGB + đèn LED + cảm biến cấu trúc ánh sáng, kết hợp AI nhận diện 73 loại vật thể. X40 Ultra dùng camera RGB + AI. Kết quả thực tế: S8 né dây sạc, tất, đồ chơi nhỏ tốt hơn. X40 đôi khi vẫn cuốn phải dây sạc mỏng. Nếu nhà bạn có thú cưng hoặc trẻ nhỏ hay để đồ trên sàn, S8 là lựa chọn an toàn hơn." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "4. Dock station — Dreame thắng" }] },
        { type: "paragraph", content: [{ type: "text", text: "Cả 2 đều có dock tự động hút bụi, giặt lau, sấy khô. Nhưng X40 Ultra dùng nước nóng 60°C để giặt miếng lau, trong khi S8 dùng nước lạnh. Nước nóng làm sạch dầu mỡ tốt hơn đáng kể. Dock của X40 cũng nhỏ gọn hơn một chút." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "5. App & Phần mềm — Roborock thắng" }] },
        { type: "paragraph", content: [{ type: "text", text: "App Roborock mượt mà, ít lỗi, giao diện trực quan. App DreameHome có nhiều tính năng hơn nhưng menu hơi rối và thỉnh thoảng lag khi load bản đồ. Về cập nhật firmware, Roborock cũng nhanh hơn." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Kết luận" }] },
        { type: "paragraph", content: [{ type: "text", text: "Nếu bạn ưu tiên lau nhà sạch và giá tốt hơn: chọn Dreame X40 Ultra. Nếu bạn cần né vật cản tốt, app mượt và thương hiệu uy tín lâu năm: chọn Roborock S8 MaxV Ultra. Cá nhân mình chọn X40 Ultra vì khả năng lau nhà vượt trội — đó là thứ mình dùng hàng ngày." }] },
      ]
    }),
    excerpt: "Sau 2 tuần test thực tế cả 2 flagship: Roborock S8 MaxV Ultra vs Dreame X40 Ultra. So sánh chi tiết lực hút, lau nhà, né vật cản, dock, app. Đâu mới là lựa chọn tốt nhất?",
    prefix: "So sánh",
    categorySlug: "reviews",
    heatScore: 98,
    viewCount: 3250,
    likeCount: 89,
    favCount: 36,
    replyCount: 58,
    geoFlag: "GB" as const,
  },
  {
    title: "Hướng dẫn chọn mua robot hút bụi đầu tiên — Từ A đến Z cho người mới (2026)",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Bạn cần gì ở một robot hút bụi?" }] },
        { type: "paragraph", content: [{ type: "text", text: "Trước khi mua, hãy trả lời 3 câu hỏi: (1) Diện tích nhà bao nhiêu m²? (2) Chủ yếu sàn cứng hay thảm? (3) Có nuôi thú cưng không? Đây là 3 yếu tố quyết định bạn cần robot loại gì." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Phân khúc giá và gợi ý" }] },
        { type: "paragraph", content: [{ type: "text", text: "Dưới 5 triệu (Entry-level): Xiaomi E10s, Eufy L60 — cơ bản, có LiDAR, hút tốt, không có dock tự động. Phù hợp nhà nhỏ <60m²." }] },
        { type: "paragraph", content: [{ type: "text", text: "5-10 triệu (Mid-range): Roborock Q5 Pro, Dreame D10s Pro, Ecovacs Deebot N20 Pro — có dock hút bụi, lực hút 5.000Pa+, app tốt. Phù hợp hầu hết gia đình." }] },
        { type: "paragraph", content: [{ type: "text", text: "10-20 triệu (Premium): Roborock Q Revo, Dreame L10s Ultra, Eufy X10 Pro Omni — dock full tính năng (hút bụi + giặt lau + sấy), lực hút 7.000Pa+, né vật cản AI. Đáng giá nhất." }] },
        { type: "paragraph", content: [{ type: "text", text: "Trên 20 triệu (Flagship): Roborock S8 MaxV Ultra, Dreame X40 Ultra — đỉnh cao công nghệ, mọi tính năng đều tốt nhất." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Các tính năng quan trọng cần chú ý" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "LiDAR vs Camera: LiDAR dựng bản đồ nhanh và chính xác hơn, hoạt động cả trong tối. Camera rẻ hơn nhưng cần ánh sáng." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Dock tự động: Nếu budget cho phép, LUÔN chọn loại có dock tự động hút bụi. Tiết kiệm công đổ bụi hàng ngày." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Lau nhà: Miếng lau xoay tròn > miếng lau rung > miếng lau kéo lê. Nếu cần lau sạch, chọn loại xoay tròn." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Pin: Nhà >100m² nên chọn pin >5.200mAh để tránh phải sạc giữa chừng." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Né vật cản AI: Nhà có thú cưng/trẻ nhỏ thì nên có tính năng này để tránh robot cuốn phải đồ." }] }] },
        ] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Mẹo tiết kiệm" }] },
        { type: "paragraph", content: [{ type: "text", text: "Săn sale Amazon Prime Day, Black Friday, 11.11 — có thể tiết kiệm 30-40%. Các dòng cũ hơn 1 năm thường giảm giá sâu nhưng vẫn rất tốt." }] },
      ]
    }),
    excerpt: "Hướng dẫn đầy đủ cho người mới: cách chọn robot hút bụi theo diện tích nhà, loại sàn, ngân sách. Phân khúc từ 3 triệu đến 30 triệu. Kèm mẹo săn sale.",
    prefix: "Hướng dẫn",
    categorySlug: "guides",
    heatScore: 95,
    viewCount: 5600,
    likeCount: 124,
    favCount: 52,
    replyCount: 73,
    geoFlag: "GB" as const,
  },
  {
    title: "Review Roborock Q Revo sau 6 tháng sử dụng — Đáng từng đồng!",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Tại sao mình chọn Q Revo?" }] },
        { type: "paragraph", content: [{ type: "text", text: "Sau 3 năm dùng Roomba i7, mình quyết định nâng cấp lên robot có dock tự động. Q Revo gây ấn tượng với mức giá ~799$ nhưng trang bị dock full tính năng: hút bụi, giặt lau, sấy khô, đổ nước sạch/nước bẩn — những thứ trước đây chỉ có trên flagship 1.500$+." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Trải nghiệm sau 6 tháng" }] },
        { type: "paragraph", content: [{ type: "text", text: "Lực hút 5.500Pa — đủ mạnh cho sàn cứng và thảm mỏng. Nhà mình 90m², 2 người lớn + 1 bé, robot chạy mỗi ngày. Bụi được hút sạch, tóc rụng không còn là vấn đề." }] },
        { type: "paragraph", content: [{ type: "text", text: "Lau nhà bằng 2 miếng xoay tròn — điểm mạnh nhất. Trước đây mình phải lau tay 2 lần/tuần, giờ robot lau mỗi ngày. Sàn luôn bóng loáng. Nước bẩn trong dock sau 1 tuần mới cần đổ." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Điểm chưa tốt" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Không có camera AI né vật cản — thỉnh thoảng cuốn phải dây sạc. Phải dọn đồ trên sàn trước khi chạy." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Dock hơi to — cần không gian 50x40cm để đặt." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Túi hút bụi 3 tháng thay 1 lần (~5$/túi)." }] }] },
        ] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Kết luận" }] },
        { type: "paragraph", content: [{ type: "text", text: "Q Revo là robot có giá trị tốt nhất phân khúc ~800$. Nếu bạn muốn dock full tính năng mà không muốn chi 1.500$ cho flagship, đây là lựa chọn số 1. Điểm 9/10." }] },
      ]
    }),
    excerpt: "6 tháng dùng Roborock Q Revo: dock full tính năng giá 799$, lực hút 5.500Pa, lau xoay tròn. Review thực tế từ người dùng nâng cấp từ Roomba i7.",
    prefix: "Review",
    categorySlug: "reviews",
    heatScore: 87,
    viewCount: 2100,
    likeCount: 56,
    favCount: 22,
    replyCount: 34,
    geoFlag: "GB" as const,
  },
  // === TROUBLESHOOTING ===
  {
    title: "Sửa lỗi robot hút bụi không kết nối WiFi — Tổng hợp các cách fix hiệu quả",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Robot hút bụi không kết nối WiFi là lỗi phổ biến nhất. Sau đây là các cách fix đã được cộng đồng kiểm chứng, sắp xếp theo tỉ lệ thành công." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "1. Kiểm tra băng tần WiFi (90% trường hợp)" }] },
        { type: "paragraph", content: [{ type: "text", text: "Hầu hết robot CHỈ hỗ trợ WiFi 2.4GHz. Nếu router của bạn đang phát cả 2.4GHz và 5GHz cùng 1 SSID, hãy tách riêng 2 băng tần hoặc tắt tạm 5GHz khi pairing. Vào app router → Wireless Settings → tách SSID 2.4GHz và 5GHz." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "2. Reset WiFi trên robot" }] },
        { type: "paragraph", content: [{ type: "text", text: "Nhấn giữ nút Home + Power trên robot 5-10 giây cho đến khi đèn nháy. Sau đó thử kết nối lại qua app." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "3. Đứng gần router khi pairing" }] },
        { type: "paragraph", content: [{ type: "text", text: "Khi pairing lần đầu, đặt robot cách router <2m. Sau khi kết nối thành công, robot có thể hoạt động xa hơn." }] },
      ]
    }),
    excerpt: "Tổng hợp các cách fix lỗi robot hút bụi không kết nối WiFi: tách băng tần 2.4GHz/5GHz, reset WiFi, đứng gần router. 90% trường hợp được fix thành công.",
    prefix: "Sửa lỗi",
    categorySlug: "troubleshooting",
    heatScore: 82,
    viewCount: 4800,
    likeCount: 67,
    favCount: 45,
    replyCount: 89,
    geoFlag: "DE" as const,
  },
  {
    title: "Cảnh báo: Dreame liên tục xóa bài đăng phàn nàn của người dùng trên nhiều nền tảng",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Cộng đồng Reddit đang xôn xao về việc Dreame bị cáo buộc xóa bài đăng phàn nàn của người dùng trên nhiều nền tảng. Một người dùng Reddit chia sẻ: 'Mua máy từ tháng 1, lần đầu liên hệ hỗ trợ là tháng 3 — và đến giờ vẫn chưa được giải quyết. Mọi bài đăng của tôi trên các nền tảng đều bị xóa.'" }] },
        { type: "paragraph", content: [{ type: "text", text: "Bài đăng đã nhận được 297 upvote và 190 bình luận, cho thấy nhiều người dùng khác cũng gặp tình trạng tương tự. Đây không phải lần đầu tiên Dreame vướng vào tranh cãi về dịch vụ khách hàng." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Người dùng nên làm gì?" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Lưu giữ tất cả email, chat log với support." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Chụp màn hình mọi bài đăng trước khi bị xóa." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Liên hệ qua nhiều kênh: app, email, Facebook, Twitter." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Nếu không được giải quyết, có thể khiếu nại lên cơ quan bảo vệ người tiêu dùng." }] }] },
        ] },
      ]
    }),
    excerpt: "Cộng đồng Reddit phàn nàn Dreame xóa bài đăng của người dùng. 297 upvote, 190 bình luận. Người dùng chia sẻ kinh nghiệm đối phó.",
    prefix: "Tin tức",
    categorySlug: "news",
    heatScore: 76,
    viewCount: 3200,
    likeCount: 48,
    favCount: 18,
    replyCount: 92,
    geoFlag: "GB" as const,
  },
  // === DEALS ===
  {
    title: "[Cập nhật] Tổng hợp deal robot hút bụi tháng 5/2026 — Giảm đến 40%",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Tổng hợp các deal robot hút bụi tốt nhất tháng 5/2026. Mình sẽ cập nhật liên tục khi có deal mới." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "DEAL NỔI BẬT" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "🔥 Roborock Q Revo: $649 (was $899) — Amazon. Giá thấp nhất từ trước đến nay!" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "🔥 Dreame L10s Ultra: $499 (was $799) — Dreame Official Store. Kèm coupon thêm $50." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Roomba Combo j7+: $599 (was $999) — Best Buy. Giảm 40%!" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Eufy X10 Pro Omni: $479 (was $699) — Amazon Lightning Deal." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Ecovacs Deebot T30 Omni: $649 (was $899) — Ecovacs Official." }] }] },
        ] },
      ]
    }),
    excerpt: "Tổng hợp deal robot hút bụi tháng 5/2026: Roborock Q Revo $649, Dreame L10s Ultra $499, Roomba j7+ $599. Giảm đến 40%!",
    prefix: "Deal",
    categorySlug: "deals",
    isSticky: true,
    heatScore: 93,
    viewCount: 7200,
    likeCount: 112,
    favCount: 68,
    replyCount: 145,
    geoFlag: "GLOBAL" as const,
  },
  // === DISCUSSION ===
  {
    title: "Robot hút bụi có thực sự đáng tiền? Câu trả lời sau 1 năm sử dụng",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Mình đã dùng robot hút bụi được 1 năm và đây là câu trả lời thành thật nhất cho câu hỏi 'Có nên mua không?'" }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Những gì robot làm tốt" }] },
        { type: "paragraph", content: [{ type: "text", text: "✅ Tiết kiệm thời gian: Mỗi ngày tiết kiệm 15-20 phút quét/lau nhà. Một năm là hơn 100 giờ. ✅ Nhà luôn sạch: Chạy hàng ngày nên bụi không tích tụ. ✅ Đi được dưới gầm giường, sofa — nơi bạn không bao giờ lau tới. ✅ Lịch trình tự động: 'Set and forget' — cài lịch 1 lần, robot tự chạy." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Những gì robot KHÔNG làm được" }] },
        { type: "paragraph", content: [{ type: "text", text: "❌ Không thay thế hoàn toàn việc dọn dẹp: Vẫn cần lau tay các vết bẩn cứng đầu 1-2 tuần/lần. ❌ Cần dọn đồ trên sàn trước khi chạy: Dây sạc, tất, đồ chơi — những thứ robot có thể cuốn vào. ❌ Góc khuất: Robot không tới được mọi ngóc ngách." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Kết luận" }] },
        { type: "paragraph", content: [{ type: "text", text: "Với mình: 100% đáng tiền. Nếu bạn đang phân vân, hãy bắt đầu với 1 con mid-range (~8-10 triệu) có dock tự động. Bạn sẽ tự hỏi tại sao không mua sớm hơn!" }] },
      ]
    }),
    excerpt: "1 năm dùng robot hút bụi: Có thực sự đáng tiền? Review thành thật về những gì robot làm tốt và không làm được. Góc nhìn từ người dùng thực tế.",
    prefix: "Thảo luận",
    categorySlug: "discussion",
    heatScore: 84,
    viewCount: 3900,
    likeCount: 95,
    favCount: 40,
    replyCount: 112,
    geoFlag: "GB" as const,
  },
  {
    title: "[Khoe máy] Setup dock robot hút bụi ẩn trong tủ IKEA — Đẹp và gọn",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Mình đã modify tủ IKEA BESTÅ để giấu dock robot hút bụi. Kết quả: cực kỳ gọn gàng và thẩm mỹ. Đây là cách làm:" }] },
        { type: "paragraph", content: [{ type: "text", text: "1. Tháo bỏ tấm đáy tủ. 2. Nâng chiều cao tủ lên đủ để robot chui vào (tối thiểu 15cm). 3. Khoét lỗ phía sau để luồn dây điện. 4. Thêm 1 miếng gỗ nhỏ làm ramp cho robot lên xuống. Tổng chi phí: ~500K VNĐ." }] },
      ]
    }),
    excerpt: "Modify tủ IKEA để giấu dock robot hút bụi. Gọn gàng, thẩm mỹ, chi phí chỉ 500K. Có ảnh hướng dẫn chi tiết.",
    prefix: "Khoe máy",
    categorySlug: "showcase",
    heatScore: 71,
    viewCount: 1500,
    likeCount: 42,
    favCount: 15,
    replyCount: 28,
    geoFlag: "DE" as const,
  },
  {
    title: "Mẹo bảo trì robot hút bụi: 5 việc cần làm hàng tháng để máy bền",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "5 việc đơn giản giúp robot của bạn chạy bền 3-5 năm:" }] },
        { type: "orderedList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Vệ sinh cảm biến: Dùng khăn khô lau sạch cảm biến chống rơi, LiDAR, camera mỗi tuần." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Thay filter: Thay filter HEPA mỗi 3-6 tháng tùy tần suất sử dụng." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Vệ sinh chổi: Gỡ tóc rối khỏi chổi chính và chổi cạnh mỗi tuần." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Kiểm tra bánh xe: Lau sạch bụi bẩn bám vào bánh xe, đảm bảo xoay trơn tru." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Đổ nước bẩn: Nếu dùng dock có chức năng lau, đổ nước bẩn hàng tuần để tránh mùi hôi và vi khuẩn." }] }] },
        ] },
      ]
    }),
    excerpt: "5 việc bảo trì đơn giản hàng tháng: vệ sinh cảm biến, thay filter, gỡ tóc rối, kiểm tra bánh xe, đổ nước bẩn. Giúp robot bền 3-5 năm.",
    prefix: "Hướng dẫn",
    categorySlug: "guides",
    heatScore: 69,
    viewCount: 2800,
    likeCount: 58,
    favCount: 31,
    replyCount: 22,
    geoFlag: "DE" as const,
  },
  {
    title: "Tin đồn: Samsung Bespoke Jet Bot AI+ mới lộ diện — Ra mắt Q3/2026?",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Theo tài liệu FCC vừa rò rỉ, Samsung đang phát triển robot hút bụi Bespoke Jet Bot thế hệ mới với camera AI nhận diện vật thể, thiết kế dock tự động được làm mới hoàn toàn — lần đầu tiên có chức năng giặt miếng lau. Thông số dự kiến: lực hút 8.000Pa, camera RGB + LiDAR kết hợp, hỗ trợ Matter protocol cho smart home. Ngày ra mắt dự kiến: tháng 8/2026." }] },
      ]
    }),
    excerpt: "FCC rò rỉ: Samsung Bespoke Jet Bot AI+ mới với dock giặt lau, Matter protocol, lực hút 8.000Pa. Dự kiến ra mắt tháng 8/2026.",
    prefix: "Tin tức",
    categorySlug: "news",
    heatScore: 66,
    viewCount: 1800,
    likeCount: 32,
    favCount: 14,
    replyCount: 38,
    geoFlag: "GB" as const,
  },
  {
    title: "Dreame X50 Ultimate — Review nhanh robot lau nhà leo cầu thang đầu tiên",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Dreame vừa trình làng Cyber X — phụ kiện leo cầu thang cho robot hút bụi. Đây KHÔNG phải là robot hút bụi, mà là một xe chở robot lên xuống cầu thang. Giải pháp cho nhà nhiều tầng: robot ngồi lên Cyber X, Cyber X leo lên tầng trên, robot tiếp tục dọn dẹp. Tự động hoàn toàn — không cần người bê robot lên tầng nữa!" }] },
        { type: "paragraph", content: [{ type: "text", text: "Đây có thể là bước đột phá cho nhà nhiều tầng — vấn đề lớn nhất của robot hút bụi hiện nay. Giá và ngày bán chưa được công bố." }] },
      ]
    }),
    excerpt: "Dreame Cyber X: xe leo cầu thang cho robot hút bụi. Giải pháp đầu tiên cho nhà nhiều tầng — robot tự động lên tầng không cần người bê.",
    prefix: "Review",
    categorySlug: "reviews",
    heatScore: 63,
    viewCount: 1200,
    likeCount: 28,
    favCount: 10,
    replyCount: 45,
    geoFlag: "GLOBAL" as const,
  },
];

async function main() {
  console.log("Importing articles to RoboVac Forum...\n");

  // Find the demo user to use as author
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@robovac-forum.com" },
  });

  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@robovac-forum.com" },
  });

  const germanUser = await prisma.user.findUnique({
    where: { email: "german@robovac-forum.com" },
  });

  if (!demoUser || !adminUser || !germanUser) {
    console.log("Users not found. Run seed.ts first.");
    return;
  }

  const authors = [demoUser, adminUser, germanUser];

  // Get all categories
  const categories = await prisma.category.findMany();
  const catMap = new Map(categories.map((c) => [c.slug, c]));

  let imported = 0;

  for (const article of ARTICLES) {
    const category = catMap.get(article.categorySlug);
    if (!category) {
      console.log(`  SKIP: category "${article.categorySlug}" not found`);
      continue;
    }

    const author = authors[imported % authors.length];

    // Check if article with same title exists
    const existing = await prisma.thread.findFirst({
      where: { title: article.title },
    });

    if (existing) {
      console.log(`  SKIP (exists): ${article.title.slice(0, 60)}...`);
      continue;
    }

    await prisma.thread.create({
      data: {
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        categoryId: category.id,
        authorId: author.id,
        prefix: article.prefix ?? undefined,
        isSticky: (article as { isSticky?: boolean }).isSticky ?? false,
        heatScore: article.heatScore,
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        favCount: article.favCount,
        replyCount: article.replyCount,
        geoFlag: article.geoFlag,
        lastPostAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 3600 * 1000)),
        lastPostById: author.id,
      },
    });

    // Update category counts
    await prisma.category.update({
      where: { id: category.id },
      data: {
        threadCount: { increment: 1 },
        postCount: { increment: 1 },
      },
    });

    console.log(`  ✓ ${article.title.slice(0, 70)}...`);
    imported++;
  }

  console.log(`\nDone! Imported ${imported} articles.`);
}

main()
  .catch((e) => {
    console.error("Import error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
