import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ARTICLES = [
  {
    title: "Top 10 robot hút bụi đáng mua nhất 2026 — Từ giá rẻ đến cao cấp",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Tổng hợp 10 mẫu robot hút bụi đáng mua nhất thị trường Việt Nam 2026, từ phân khúc phổ thông đến cao cấp. Danh sách được chọn dựa trên trải nghiệm thực tế và đánh giá từ cộng đồng người dùng." }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Phân khúc phổ thông (dưới 5 triệu)" }] },
      { type: "paragraph", content: [{ type: "text", text: "#1 Xiaomi E10s (3.5tr) — Robot LiDAR rẻ nhất, hút tốt, app ổn. Phù hợp nhà <60m². #2 Eufy L60 (4.2tr) — Pin lâu, hút khỏe, bảo hành 2 năm. #3 Medion MD19600 (2.9tr) — Hàng Đức giá rẻ, cơ bản nhưng bền." }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Phân khúc tầm trung (5-10 triệu)" }] },
      { type: "paragraph", content: [{ type: "text", text: "#4 Roborock Q5 Pro (6.5tr) — LiDAR + 5.500Pa + app tốt nhất tầm giá. #5 Dreame D10s Pro (7.2tr) — Có dock hút bụi rẻ nhất, lau cơ bản. #6 Ecovacs Deebot N20 Pro (8.5tr) — Dock tự động, navigation tốt." }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Phân khúc cao cấp (10-20 triệu)" }] },
      { type: "paragraph", content: [{ type: "text", text: "#7 Roborock Q Revo (12tr) — Dock full tính năng giá tốt nhất VN. #8 Dreame L10s Ultra (13.5tr) — Lau nhà cực đỉnh, nước nóng 60°C. #9 Eufy X10 Pro Omni (11tr) — Bất ngờ lớn, giá rẻ hơn cả Q Revo." }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Phân khúc flagship (trên 20 triệu)" }] },
      { type: "paragraph", content: [{ type: "text", text: "#10 Roborock S8 MaxV Ultra (28tr) — Đỉnh cao công nghệ. #11 Dreame X40 Ultra (25tr) — Đối thủ xứng tầm." }] },
    ] }),
    excerpt: "Top 10 robot hút bụi đáng mua nhất 2026 tại Việt Nam: Xiaomi E10s, Roborock Q5 Pro, Dreame D10s Pro, Q Revo, L10s Ultra, S8 MaxV. Đủ phân khúc từ 3-28 triệu.",
    prefix: "Top list", categorySlug: "reviews", heatScore: 96, viewCount: 8500, likeCount: 210, favCount: 75, replyCount: 128, geoFlag: "GLOBAL" as const,
  },
  {
    title: "Kinh nghiệm mua robot hút bụi tại Việt Nam: Tránh hàng giả, chọn nơi uy tín",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Thị trường robot hút bụi tại Việt Nam đang rất sôi động nhưng cũng tiềm ẩn nhiều rủi ro: hàng giả, hàng xách tay không bảo hành, phụ kiện thay thế kém chất lượng. Đây là cẩm nang giúp bạn mua được robot chính hãng, giá tốt." }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "1. Chọn nơi mua uy tín" }] },
      { type: "paragraph", content: [{ type: "text", text: "Nên mua tại các cửa hàng lớn: CellphoneS, Thế Giới Di Động, FPT Shop, Hoàng Hà Mobile — có hóa đơn VAT, bảo hành chính hãng. Tránh mua hàng xách tay trên Shopee/Lazada từ shop không rõ nguồn gốc — giá rẻ hơn 20-30% nhưng KHÔNG CÓ BẢO HÀNH, không có phụ kiện thay thế chính hãng." }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "2. Phân biệt hàng chính hãng và xách tay" }] },
      { type: "bulletList", content: [
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Hàng chính hãng: Hộp có tem nhập khẩu, sách hướng dẫn tiếng Việt, app hỗ trợ server Việt Nam, bảo hành 12-24 tháng." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Hàng xách tay: Thường là hàng Trung Quốc nội địa, app bị khóa region, không có bảo hành tại VN. Robot có thể bị khóa tính năng khi phát hiện dùng ngoài Trung Quốc." }] }] },
      ] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "3. Săn sale đúng thời điểm" }] },
      { type: "paragraph", content: [{ type: "text", text: "Các đợt sale lớn trong năm: 11.11, 12.12, Black Friday, Tết Nguyên Đán, sinh nhật Shopee/Lazada. Có thể tiết kiệm 20-40% so với giá niêm yết. Mẹo: theo dõi giá 1-2 tháng trước sale để biết giá thật." }] },
    ] }),
    excerpt: "Cẩm nang mua robot hút bụi ở Việt Nam: phân biệt hàng chính hãng vs xách tay, địa chỉ uy tín (CellphoneS, TGDĐ, FPT), mẹo săn sale 11.11, Black Friday.",
    prefix: "Hướng dẫn", categorySlug: "guides", heatScore: 88, viewCount: 6200, likeCount: 145, favCount: 62, replyCount: 94, geoFlag: "GLOBAL" as const,
  },
  {
    title: "Có nên mua robot hút bụi Xiaomi? Review thực tế sau 1 năm sử dụng tại VN",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Xiaomi là thương hiệu robot hút bụi phổ biến nhất tại Việt Nam nhờ giá rẻ và hệ sinh thái Mi Home quen thuộc. Nhưng chất lượng thực sự thế nào sau thời gian dài sử dụng? Mình đã dùng Xiaomi X20+ được 1 năm, đây là review thành thật." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Ưu điểm:" }, { type: "text", text: " Giá rẻ nhất phân khúc có LiDAR + dock (8.5tr). App Mi Home tiếng Việt, dễ dùng. Pin 5.200mAh — hút được 120m²/lần sạc. Phụ kiện thay thế rẻ, dễ tìm trên Shopee (filter 50K, chổi 80K)." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Nhược điểm:" }, { type: "text", text: " Không có AI né vật cản — thường xuyên cuốn dây sạc. Lau nhà chỉ ở mức cơ bản (miếng lau kéo lê). Dock không có sấy khô — miếng lau bị ẩm mốc nếu không phơi. App thỉnh thoảng lag khi cập nhật firmware." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Kết luận:" }, { type: "text", text: " X20+ là lựa chọn tốt nếu bạn cần robot LiDAR có dock tự động với ngân sách dưới 10 triệu. Nhưng nếu có thể chi thêm 3-4 triệu, nên lên Roborock Q Revo hoặc Dreame L10s Ultra để có trải nghiệm tốt hơn hẳn." }] },
    ] }),
    excerpt: "1 năm dùng Xiaomi X20+ tại Việt Nam: review thành thật về ưu điểm (giá rẻ, app VN, phụ kiện rẻ) và nhược điểm (không AI, lau kém, dock không sấy).",
    prefix: "Review", categorySlug: "reviews", heatScore: 82, viewCount: 4700, likeCount: 98, favCount: 34, replyCount: 76, geoFlag: "GLOBAL" as const,
  },
  {
    title: "Robot hút bụi cho nhà 3 tầng — Giải pháp nào tối ưu nhất?",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Nhà nhiều tầng là bài toán khó với robot hút bụi. Hầu hết robot chỉ quét được 1 tầng/bản đồ. Vậy giải pháp nào cho nhà 3 tầng?" }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Option 1: 1 robot cho mỗi tầng (tối ưu nhất)" }, { type: "text", text: " — Mua 3 robot: 1 flagship cho tầng trệt (nhiều bụi nhất), 2 con tầm trung cho tầng trên. Chi phí: 25-35tr. Ưu điểm: mỗi tầng luôn sạch, không cần bê robot. Nhược điểm: chi phí cao, cần nhiều không gian để dock." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Option 2: Bê robot lên xuống (tiết kiệm nhất)" }, { type: "text", text: " — Mua 1 robot tốt, bê lên tầng cần dọn. Hầu hết robot cho phép lưu nhiều bản đồ. Chi phí: 10-15tr. Ưu điểm: tiết kiệm. Nhược điểm: mất công bê, dễ quên." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Option 3: Robot leo cầu thang (tương lai)" }, { type: "text", text: " — Roborock GRover và Dreame Cyber X sắp ra mắt với khả năng leo cầu thang. Đây sẽ là giải pháp cuối cùng cho nhà nhiều tầng. Nhưng giá dự kiến >40tr và cần chờ review thực tế." }] },
    ] }),
    excerpt: "Nhà 3 tầng nên mua robot hút bụi thế nào? 3 giải pháp: mua 3 robot (25-35tr), bê lên xuống (10-15tr), hoặc chờ robot leo cầu thang GRover/Cyber X.",
    prefix: "Tư vấn", categorySlug: "discussion", heatScore: 73, viewCount: 3100, likeCount: 67, favCount: 28, replyCount: 85, geoFlag: "GLOBAL" as const,
  },
  {
    title: "So sánh chi phí nuôi robot hút bụi 1 năm: Đắt hơn bạn nghĩ!",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Nhiều người nghĩ mua robot xong là hết chi phí. Nhưng thực tế, chi phí nuôi robot 1 năm cũng đáng kể. Mình đã thống kê chi tiết cho Roborock Q Revo sau 1 năm:" }] },
      { type: "bulletList", content: [
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Túi hút bụi:" }, { type: "text", text: " Thay mỗi 2-3 tháng. 4 túi x 120K = 480K/năm." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Filter HEPA:" }, { type: "text", text: " Thay mỗi 6 tháng. 2 filter x 200K = 400K/năm." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Chổi chính + chổi cạnh:" }, { type: "text", text: " Thay mỗi năm. 1 bộ x 350K = 350K/năm." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Miếng lau:" }, { type: "text", text: " Thay mỗi 6 tháng. 2 bộ x 150K = 300K/năm." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Nước lau sàn chuyên dụng:" }, { type: "text", text: " 1 chai/tháng x 80K = 960K/năm." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Điện:" }, { type: "text", text: " ~50W/ngày x 365 = ~200K/năm." }] }] },
      ] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Tổng: ~2.7 triệu/năm (~225K/tháng)." }, { type: "text", text: " Không quá đắt so với tiện ích mang lại, nhưng cũng không phải 'miễn phí sau khi mua'. Mẹo: mua phụ kiện compatible (không chính hãng) trên Shopee có thể giảm 50% chi phí." }] },
    ] }),
    excerpt: "Chi phí nuôi robot hút bụi 1 năm: túi bụi 480K, filter 400K, chổi 350K, nước lau 960K. Tổng ~2.7tr/năm. Có cách tiết kiệm 50%!",
    prefix: "Phân tích", categorySlug: "discussion", heatScore: 64, viewCount: 2800, likeCount: 58, favCount: 24, replyCount: 42, geoFlag: "GLOBAL" as const,
  },
  {
    title: "Hướng dẫn tự sửa robot hút bụi tại nhà: 7 lỗi thường gặp và cách fix",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Robot hút bụi hỏng không nhất thiết phải mang ra tiệm. 70% lỗi có thể tự sửa tại nhà với dụng cụ cơ bản. Đây là 7 lỗi phổ biến nhất và cách fix:" }] },
      { type: "orderedList", content: [
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Robot không sạc:" }, { type: "text", text: " Vệ sinh điểm tiếp xúc sạc trên robot và dock bằng cồn. Kiểm tra adapter nguồn." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Hút yếu:" }, { type: "text", text: " Vệ sinh filter (rửa nước, phơi khô hoàn toàn). Kiểm tra đường ống hút có tắc không. Thay filter nếu đã dùng >6 tháng." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Chổi không quay:" }, { type: "text", text: " Gỡ tóc rối khỏi chổi. Kiểm tra dây curoa (nếu có). Vệ sinh trục quay." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Không kết nối WiFi:" }, { type: "text", text: " Reset WiFi, đảm bảo dùng băng tần 2.4GHz, đứng gần router khi pairing." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Rơi cầu thang:" }, { type: "text", text: " Vệ sinh cảm biến chống rơi (4 mắt dưới đáy robot). Kiểm tra cảm biến có bị che khuất không." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Không tìm thấy dock:" }, { type: "text", text: " Di chuyển dock ra vị trí thoáng (2 bên trống 0.5m, trước mặt 1.5m). Reset vị trí dock trong app." }] }] },
        { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Kêu to bất thường:" }, { type: "text", text: " Kiểm tra có dị vật trong chổi/đường hút. Bôi trơn bánh xe nếu cần." }] }] },
      ] },
      { type: "paragraph", content: [{ type: "text", text: "⚠️ Lưu ý: Nếu robot còn bảo hành — KHÔNG tự ý mở máy, sẽ mất bảo hành. Mang ra trung tâm bảo hành chính hãng." }] },
    ] }),
    excerpt: "7 lỗi robot hút bụi thường gặp và cách tự sửa tại nhà: không sạc, hút yếu, chổi không quay, mất WiFi, rơi cầu thang. Tiết kiệm tiền sửa chữa!",
    prefix: "Sửa lỗi", categorySlug: "troubleshooting", heatScore: 75, viewCount: 5300, likeCount: 112, favCount: 58, replyCount: 67, geoFlag: "GLOBAL" as const,
  },
  {
    title: "[Poll] Bạn dùng robot hút bụi thương hiệu nào? Bình chọn ngay!",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Cộng đồng RoboVac Forum cùng bình chọn xem thương hiệu robot hút bụi nào được yêu thích nhất tại Việt Nam! Để lại bình luận về trải nghiệm của bạn với thương hiệu đang dùng." }] },
      { type: "paragraph", content: [{ type: "text", text: "Kết quả sẽ được tổng hợp sau 1 tuần. Hãy chia sẻ bài viết này để có thêm nhiều người tham gia bình chọn!" }] },
    ] }),
    excerpt: "Bình chọn thương hiệu robot hút bụi được yêu thích nhất tại Việt Nam. Roborock, Dreame, Xiaomi, Ecovacs, iRobot — đâu là số 1?",
    prefix: "Bình chọn", categorySlug: "discussion", isPoll: true, heatScore: 68, viewCount: 4200, likeCount: 88, favCount: 32, replyCount: 156, geoFlag: "GLOBAL" as const,
  },
  {
    title: "Robot hút bụi có thay thế được osin/giúp việc không? Góc nhìn thành thật",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Câu hỏi muôn thuở của các bà nội trợ Việt: 'Robot hút bụi có thay được osin không?' Sau 2 năm dùng robot mỗi ngày, đây là câu trả lời thành thật nhất." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Robot làm tốt:" }, { type: "text", text: " Hút bụi/lau sàn hàng ngày (tiết kiệm 15-20 phút/ngày). Đi được dưới gầm giường, sofa. Lịch tự động — nhà luôn sạch mà không cần nhớ." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Robot KHÔNG làm được:" }, { type: "text", text: " Lau bàn ghế, tủ kệ, bếp. Giặt quần áo. Rửa chén. Dọn dẹp đồ đạc lộn xộn. Nói chung — robot chỉ làm SÀN, không làm được gì khác." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Kết luận:" }, { type: "text", text: " Robot giảm 70% công việc lau dọn sàn. Nhưng không thể thay thế hoàn toàn osin. Nếu nhà bạn chủ yếu bừa bộn đồ đạc chứ không phải bụi bẩn — robot không giúp được nhiều. Còn nếu nhà bạn sạch sẽ, gọn gàng, chỉ có bụi — robot sẽ là osin robot tốt nhất bạn từng có." }] },
    ] }),
    excerpt: "Robot hút bụi có thay thế được osin không? Review thành thật sau 2 năm: Robot làm tốt 70% việc lau sàn. Nhưng không thay thế hoàn toàn được người giúp việc.",
    prefix: "Thảo luận", categorySlug: "discussion", heatScore: 71, viewCount: 3800, likeCount: 76, favCount: 30, replyCount: 98, geoFlag: "GLOBAL" as const,
  },
  {
    title: "Cập nhật firmware robot hút bụi: Nên hay không? Kinh nghiệm xương máu",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Cập nhật firmware có thể cải thiện hiệu suất robot, nhưng cũng có thể... 'brick' máy của bạn nếu làm sai. Đây là những điều cần biết trước khi nhấn nút 'Update'." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "NÊN cập nhật khi:" }, { type: "text", text: " Có lỗi nghiêm trọng được fix (robot không tìm thấy dock, mapping sai). Có tính năng mới quan trọng (hỗ trợ nhiều tầng, cải thiện AI). Firmware đã ra được >2 tuần (đã có người test)." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "KHÔNG NÊN cập nhật khi:" }, { type: "text", text: " Vừa ra mắt <1 tuần (có thể có bug). Robot đang hoạt động ổn định (nếu không có gì cần sửa, đừng đụng vào). Đang trong quá trình dọn dẹp hoặc pin <30%." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Kinh nghiệm xương máu:" }, { type: "text", text: " Mình từng cập nhật firmware cho Dreame L10s ngay khi vừa ra — robot bị mất bản đồ hoàn toàn, phải map lại từ đầu mất 3 ngày. Từ đó chỉ cập nhật sau khi đọc review từ cộng đồng ít nhất 1 tuần." }] },
    ] }),
    excerpt: "Cập nhật firmware robot hút bụi: khi nào NÊN và khi nào KHÔNG NÊN. Kinh nghiệm xương máu từ người từng bị mất bản đồ sau update.",
    prefix: "Kinh nghiệm", categorySlug: "troubleshooting", heatScore: 56, viewCount: 2100, likeCount: 43, favCount: 19, replyCount: 36, geoFlag: "GLOBAL" as const,
  },
  {
    title: "Đánh giá nhanh Roborock Saros 10R: Siêu phẩm mới nhất từ Roborock có gì đặc biệt?",
    content: JSON.stringify({ type: "doc", content: [
      { type: "paragraph", content: [{ type: "text", text: "Roborock vừa ra mắt Saros 10R — dòng robot mới nhất của hãng với nhiều cải tiến đáng giá. Mình đã có cơ hội trên tay và test nhanh, đây là những điểm nổi bật:" }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Thiết kế:" }, { type: "text", text: " Mỏng hơn 20% so với S8, chỉ còn 8.5cm — chui được dưới nhiều đồ đạc hơn. Dock nhỏ gọn hơn, phù hợp căn hộ Việt Nam." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Lực hút:" }, { type: "text", text: " 12.000Pa — mạnh nhất phân khúc. Hút sạch cả bụi mịn trên thảm lông dày." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "AI né vật cản:" }, { type: "text", text: " Camera RGB + LED + AI — nhận diện 80+ loại vật thể, bao gồm phân thú cưng (tính năng cực kỳ quan trọng cho nhà có chó mèo)." }] },
      { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Giá:" }, { type: "text", text: " Dự kiến ~32 triệu tại Việt Nam. Không rẻ, nhưng xứng đáng nếu bạn muốn robot tốt nhất hiện nay." }] },
    ] }),
    excerpt: "Trên tay Roborock Saros 10R: mỏng 8.5cm, lực hút 12.000Pa, AI nhận diện 80+ vật thể. Giá dự kiến 32 triệu tại Việt Nam. Có đáng để nâng cấp?",
    prefix: "Review", categorySlug: "reviews", heatScore: 77, viewCount: 3700, likeCount: 64, favCount: 22, replyCount: 45, geoFlag: "GLOBAL" as const,
  },
];

async function main() {
  console.log("Importing VN articles batch 3...\n");

  const users = await prisma.user.findMany({ take: 3 });
  if (users.length === 0) { console.log("No users found!"); return; }

  const categories = await prisma.category.findMany();
  const catMap = new Map(categories.map((c) => [c.slug, c]));

  let imported = 0;
  for (const article of ARTICLES) {
    const cat = catMap.get(article.categorySlug);
    if (!cat) continue;
    const existing = await prisma.thread.findFirst({ where: { title: article.title } });
    if (existing) { console.log(`  SKIP: ${article.title.slice(0, 50)}...`); continue; }

    const author = users[imported % users.length];
    await prisma.thread.create({
      data: {
        title: article.title, content: article.content, excerpt: article.excerpt,
        categoryId: cat.id, authorId: author.id, prefix: article.prefix,
        isSticky: (article as Record<string, unknown>).isSticky === true,
        isPoll: (article as Record<string, unknown>).isPoll === true,
        heatScore: article.heatScore, viewCount: article.viewCount,
        likeCount: article.likeCount, favCount: article.favCount,
        replyCount: article.replyCount, geoFlag: article.geoFlag,
        lastPostAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)),
        lastPostById: author.id,
      },
    });
    await prisma.category.update({ where: { id: cat.id }, data: { threadCount: { increment: 1 }, postCount: { increment: 1 } } });
    console.log(`  ✓ ${article.title.slice(0, 65)}...`);
    imported++;
  }
  console.log(`\nDone! Imported ${imported} VN articles.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
