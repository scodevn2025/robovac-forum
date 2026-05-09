import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ARTICLES = [
  {
    title: "Phân tích 1 năm dữ liệu Reddit: 25 robot hút bụi được đề xuất nhiều nhất theo từng mức giá",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Mình đã phân tích dữ liệu từ hơn 10.000 bình luận và bài đăng trên Reddit trong 1 năm qua (11/2024 - 11/2025) để tìm ra những robot hút bụi được cộng đồng đề xuất nhiều nhất. Dữ liệu được phân loại theo mức giá để dễ so sánh." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Top robot theo mức giá" }] },
        { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Dưới 300$:" }] }, { type: "paragraph", content: [{ type: "text", text: "#1 Roborock Q5 Pro — LiDAR, 5.500Pa, app tốt nhất phân khúc. #2 Eufy L60 — rẻ, đáng tin cậy. #3 Xiaomi E10s — giá rẻ nhất có LiDAR." }] },
        { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "300$-600$:" }] }, { type: "paragraph", content: [{ type: "text", text: "#1 Dreame D10s Pro — có dock hút bụi rẻ nhất. #2 Roborock Q8 Max — nâng cấp từ Q5, thêm dock. #3 Roomba i5+ — lựa chọn duy nhất từ iRobot." }] },
        { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "600$-1000$:" }] }, { type: "paragraph", content: [{ type: "text", text: "#1 Roborock Q Revo — dock full tính năng giá tốt nhất. #2 Dreame L10s Ultra — đối thủ trực tiếp của Q Revo. #3 Eufy X10 Pro Omni — bất ngờ lớn từ Eufy!" }] },
        { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Trên 1000$:" }] }, { type: "paragraph", content: [{ type: "text", text: "#1 Roborock S8 MaxV Ultra — vua flagship. #2 Dreame X40 Ultra — cạnh tranh sát sao. #3 Roomba j9+ — lựa chọn từ iRobot cho ai trung thành thương hiệu." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Xu hướng thú vị" }] },
        { type: "paragraph", content: [{ type: "text", text: "Roborock thống trị 60% đề xuất ở mọi phân khúc. Dreame đang tăng trưởng nhanh nhất (+40% so với năm trước). iRobot tụt hạng rõ rệt — từ #1 xuống #4. Người dùng ngày càng ưu tiên dock tự động — 85% đề xuất dòng có dock." }] },
      ]
    }),
    excerpt: "Phân tích 10.000+ bình luận Reddit: Top 25 robot hút bụi được đề xuất nhiều nhất, xếp theo mức giá từ dưới 300$ đến trên 1000$. Kèm xu hướng thị trường.",
    prefix: "Phân tích",
    categorySlug: "reviews",
    heatScore: 90,
    viewCount: 4100,
    likeCount: 78,
    favCount: 29,
    replyCount: 63,
    geoFlag: "GB" as const,
  },
  {
    title: "Cảnh sát ập đến nhà tôi lúc 2h sáng vì... Roborock Saros 10R!",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Câu chuyện có thật 100% từ 1 người dùng Reddit ở châu Âu. Anh ấy đã lên lịch cho Roborock Saros 10R chạy lau nhà vào ban đêm ở tầng trệt. Robot chạy quét và lau lúc 1-2h sáng. Hàng xóm thấy ánh đèn di chuyển và tiếng động trong nhà lúc nửa đêm nên đã gọi cảnh sát báo trộm!" }] },
        { type: "paragraph", content: [{ type: "text", text: "Kết quả: 3 xe cảnh sát ập đến, họ vào nhà và phát hiện 'nghi phạm' là 1 con robot hút bụi đang chăm chỉ lau nhà. Anh chủ nhà phải giải thích và xin lỗi cảnh sát. Bài đăng nhận được 529 upvote và hàng trăm bình luận hài hước từ cộng đồng." }] },
        { type: "paragraph", content: [{ type: "text", text: "Bài học rút ra: Đừng để robot chạy lúc nửa đêm nếu nhà bạn có cửa kính nhìn ra ngoài! Hoặc ít nhất hãy báo trước cho hàng xóm." }] },
      ]
    }),
    excerpt: "Người dùng Reddit kể: Roborock Saros 10R lau nhà lúc 2h sáng, hàng xóm tưởng trộm gọi cảnh sát. 3 xe cảnh sát ập đến, 'nghi phạm' là robot lau nhà!",
    prefix: "Vui",
    categorySlug: "discussion",
    heatScore: 78,
    viewCount: 5600,
    likeCount: 132,
    favCount: 28,
    replyCount: 67,
    geoFlag: "DE" as const,
  },
  {
    title: "Vợ bảo tôi phí tiền... cho đến khi Z70 chứng minh điều ngược lại",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Một người dùng Reddit chia sẻ: 'Có bữa tiệc gia đình cuối tuần trước, nhà cửa bừa bộn kinh khủng: bánh vụn khắp nơi, vết nước ngọt dính trên sàn, cả sốt bắn lên chân tủ. Nhưng lần này, con Roborock Z70 mà tôi khăng khăng đòi mua đã thực sự tỏa sáng.'" }] },
        { type: "paragraph", content: [{ type: "text", text: "Điều tuyệt nhất là robot có chổi cạnh nâng hạ được ở cả 2 bên, dễ dàng len vào khe hở giữa chân tủ và chân bàn. Không còn phải cúi xuống kiểm tra sốt còn sót lại. Tiết kiệm rất nhiều thời gian và công sức." }] },
        { type: "paragraph", content: [{ type: "text", text: "Kết quả: vợ từ 'anh lại phí tiền rồi' chuyển sang 'ok, cái này cũng có ích đấy'. 568 upvote từ cộng đồng — ai cũng hiểu cảm giác này!" }] },
      ]
    }),
    excerpt: "Mua Roborock Z70, vợ chê phí tiền. Sau bữa tiệc gia đình, nhà sạch bóng, vợ công nhận 'cũng có ích đấy'. 568 upvote từ cộng đồng Reddit.",
    prefix: "Trải nghiệm",
    categorySlug: "discussion",
    heatScore: 72,
    viewCount: 3200,
    likeCount: 86,
    favCount: 19,
    replyCount: 42,
    geoFlag: "GB" as const,
  },
  {
    title: "iRobot (Roomba) nộp đơn phá sản sau 35 năm — Bài học cho ngành robot tiêu dùng",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Tin shock: iRobot — công ty đã tạo ra Roomba, robot hút bụi đầu tiên trên thế giới — vừa nộp đơn phá sản sau 35 năm hoạt động. Cổ phiếu giảm 80% trong 2 năm qua. Vậy chuyện gì đã xảy ra?" }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Nguyên nhân chính" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Cạnh tranh khốc liệt từ Trung Quốc: Roborock, Dreame, Ecovacs ra mắt sản phẩm mới mỗi 6 tháng với công nghệ vượt trội và giá thấp hơn 30-40%." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Chậm đổi mới: Trong khi đối thủ có dock tự động, lau nhà, AI né vật cản — iRobot vẫn tập trung vào hút bụi đơn thuần." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Thương vụ Amazon thất bại: EU chặn thương vụ Amazon mua iRobot với giá 1.7 tỷ USD năm 2024 — cú đánh chí mạng." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Khủng hoảng danh tiếng: Nhiều đời máy lỗi phần mềm, app crash, không cập nhật kịp." }] }] },
        ] },
        { type: "paragraph", content: [{ type: "text", text: "iRobot vẫn có thể được mua lại bởi 1 công ty khác. Nhưng đây là hồi chuông cảnh tỉnh: trong ngành công nghệ tiêu dùng, không ai là bất khả chiến bại — kể cả người tiên phong." }] },
      ]
    }),
    excerpt: "iRobot (Roomba) phá sản sau 35 năm. Phân tích nguyên nhân: cạnh tranh Trung Quốc, chậm đổi mới, thương vụ Amazon thất bại. Bài học cho ngành robot tiêu dùng.",
    prefix: "Tin tức",
    categorySlug: "news",
    heatScore: 85,
    viewCount: 6800,
    likeCount: 156,
    favCount: 45,
    replyCount: 134,
    geoFlag: "GB" as const,
  },
  {
    title: "Kinh nghiệm mua robot hút bụi cho người nuôi thú cưng — Những tính năng PHẢI CÓ",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Nhà có chó mèo thì mua robot hút bụi cần chú ý gì? Mình nuôi 2 mèo và 1 chó, đã test 5 robot khác nhau. Đây là những tính năng BẮT BUỘC phải có:" }] },
        { type: "orderedList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Chổi chống rối lông:" }, { type: "text", text: " Chổi cao su (như Roborock) tốt hơn chổi lông truyền thống. Lông thú KHÔNG bị quấn vào chổi, dễ vệ sinh hơn. Q Revo và S8 series là tốt nhất." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "AI né vật cản:" }, { type: "text", text: " QUAN TRỌNG NHẤT. Robot cần nhận diện được phân thú cưng, đồ chơi, bát ăn. Không có AI, bạn sẽ có 1 thảm họa 'bôi phân khắp nhà'. Roborock S8 MaxV và Dreame X40 là tốt nhất." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Filter HEPA:" }, { type: "text", text: " Lọc được lông thú mịn, phấn hoa, mạt bụi. Giúp không khí trong nhà sạch hơn." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Pin lớn:" }, { type: "text", text: " Nhà có thú cưng cần hút nhiều hơn. Pin >5.000mAh để hút hết 1 lần không cần sạc giữa chừng." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Dock tự động:" }, { type: "text", text: " Lông thú đầy hộp bụi sau mỗi lần chạy. Có dock tự động hút bụi thì bạn không phải đổ bụi hàng ngày." }] }] },
        ] },
        { type: "paragraph", content: [{ type: "text", text: "🏆 Top 3 robot cho nhà có thú cưng: #1 Roborock S8 MaxV Ultra, #2 Dreame X40 Ultra, #3 Roborock Q Revo (ngân sách thấp hơn)." }] },
      ]
    }),
    excerpt: "Nhà có chó mèo cần robot hút bụi có gì? AI né vật cản, chổi chống rối lông, filter HEPA, pin lớn, dock tự động. Review từ người nuôi 2 mèo 1 chó.",
    prefix: "Hướng dẫn",
    categorySlug: "guides",
    heatScore: 74,
    viewCount: 2600,
    likeCount: 63,
    favCount: 28,
    replyCount: 39,
    geoFlag: "GB" as const,
  },
  {
    title: "Làm thế nào để ngăn mèo... cưỡi robot hút bụi?",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Một vấn đề tưởng đùa nhưng lại rất thật với nhiều người nuôi mèo: mèo thích nhảy lên robot hút bụi đang chạy và... cưỡi nó như ngựa. Chủ nhân đã thử mọi cách: đồ chơi, thức ăn, phòng riêng — nhưng mèo vẫn mê robot hơn tất cả." }] },
        { type: "paragraph", content: [{ type: "text", text: "Bài đăng này nhận được 867 upvote và 212 bình luận trên Reddit, với vô số giải pháp hài hước từ cộng đồng: 'Cho nó leo lên đi, rồi nó sẽ chán', 'Mua con robot thứ 2 cho nó', 'Chấp nhận số phận đi — giờ nhà bạn có 2 thú cưng rồi'." }] },
        { type: "paragraph", content: [{ type: "text", text: "Giải pháp thực tế nhất: Để robot chạy khi mèo đang ở phòng khác, hoặc dùng chế độ hẹn giờ lúc mèo đang ngủ. Một số người dùng Roborock cho biết tính năng phát hiện thú cưng tự động dừng khi thấy mèo đến gần." }] },
      ]
    }),
    excerpt: "Vấn đề có thật: mèo thích cưỡi robot hút bụi. 867 upvote, 212 bình luận Reddit. Giải pháp hài hước và thực tế từ cộng đồng.",
    prefix: "Thảo luận",
    categorySlug: "discussion",
    heatScore: 68,
    viewCount: 1900,
    likeCount: 54,
    favCount: 16,
    replyCount: 48,
    geoFlag: "GB" as const,
  },
  {
    title: "Hướng dẫn cho người mới mua Dreame: Đừng hoảng khi robot chạy như say rượu!",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Nếu bạn vừa mua Dreame và thấy robot chạy loạng choạng, quay vòng vòng, đi lùi — ĐỪNG LO. Đây là những điều mọi chủ Dreame mới cần biết:" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Lần chạy đầu tiên sẽ như say rượu:" }, { type: "text", text: " HOÀN TOÀN BÌNH THƯỜNG. Robot đang vừa dọn vừa build bản đồ. Nó sẽ chạy vòng vòng, quay đầu đột ngột, backtrack. Đừng dừng nó — hãy để nó chạy hết 1 chu kỳ." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Sẽ cải thiện sau 1-3 lần chạy:" }, { type: "text", text: " Sau khi có bản đồ, robot sẽ chạy theo đường thẳng, có logic, nhanh hơn hẳn. Kiên nhẫn!" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Đèn sáng giúp mapping tốt hơn:" }, { type: "text", text: " Bật đèn trong phòng khi robot chạy lần đầu. Camera cần ánh sáng để nhận diện vật thể." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Không cần dọn nhà quá sạch:" }, { type: "text", text: " Chỉ cần nhặt dây sạc, tất, đồ chơi nhỏ lên. Những thứ khác robot sẽ tự né hoặc đẩy qua." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "App DreameHome:" }, { type: "text", text: " Đôi khi lag khi load bản đồ lớn. Thoát app và mở lại. Cập nhật firmware thường xuyên." }] }] },
        ] },
        { type: "paragraph", content: [{ type: "text", text: "Bài đăng gốc nhận được 97 upvote và 97 bình luận — chứng tỏ rất nhiều người cùng trải qua cảm giác 'hoang mang' này!" }] },
      ]
    }),
    excerpt: "Mới mua Dreame thấy robot chạy như say rượu? ĐỪNG HOẢNG! Đây là điều bình thường. Hướng dẫn từ cộng đồng Reddit cho chủ Dreame mới: mapping, app, mẹo.",
    prefix: "Hướng dẫn",
    categorySlug: "guides",
    heatScore: 65,
    viewCount: 2200,
    likeCount: 41,
    favCount: 17,
    replyCount: 33,
    geoFlag: "GLOBAL" as const,
  },
  {
    title: "Roborock GRover: Robot hút bụi biết leo cầu thang — Cách mạng cho nhà nhiều tầng!",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Roborock vừa tung video quảng cáo GRover — robot hút bụi đầu tiên của hãng có khả năng LEO CẦU THANG. Video cho thấy GRover bò lên bậc thang gỗ một cách dễ dàng nhờ hệ thống chân đặc biệt, trông như một chú ếch robot bước ra từ phim Tron." }] },
        { type: "paragraph", content: [{ type: "text", text: "Đây là bước đột phá lớn nhất của ngành robot hút bụi trong năm 2026. Nếu GRover hoạt động tốt trong thực tế (không chỉ trong video quảng cáo), nó sẽ giải quyết vấn đề LỚN NHẤT của robot hút bụi hiện nay: không thể dọn nhiều tầng mà không có người bê." }] },
        { type: "paragraph", content: [{ type: "text", text: "Cộng đồng Reddit đang rất phấn khích: 293 upvote, 52 bình luận. Nhiều người nói 'đây là thứ tôi đã chờ đợi 10 năm nay'. Giá và ngày ra mắt: chưa công bố, nhưng dự kiến cuối 2026." }] },
      ]
    }),
    excerpt: "Roborock GRover biết leo cầu thang — robot hút bụi đầu tiên làm được điều này. Video quảng cáo gây sốt Reddit. Đây có phải là cách mạng cho nhà nhiều tầng?",
    prefix: "Tin tức",
    categorySlug: "news",
    heatScore: 70,
    viewCount: 2500,
    likeCount: 45,
    favCount: 14,
    replyCount: 52,
    geoFlag: "DE" as const,
  },
  {
    title: "5 sai lầm phổ biến khi dùng robot hút bụi — Có thể bạn đang mắc ít nhất 1 cái!",
    content: JSON.stringify({
      type: "doc",
      content: [
        { type: "orderedList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Không vệ sinh cảm biến:" }, { type: "text", text: " Cảm biến bám bụi sau 1-2 tuần sẽ khiến robot 'mù' — chạy loạng choạng, rơi cầu thang, không tìm được dock. Lau cảm biến mỗi tuần bằng khăn khô." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Không thay phụ kiện định kỳ:" }, { type: "text", text: " Filter HEPA (3-6 tháng), chổi chính (6-12 tháng), chổi cạnh (3-6 tháng), túi hút bụi (2-3 tháng). Dùng phụ kiện mòn = hiệu suất giảm 40%." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Để robot chạy khi không có nhà mà không dọn đồ trên sàn:" }, { type: "text", text: " Dây sạc, dây giày, thảm nhỏ — những thứ robot sẽ cuốn vào và đứng im cho đến khi bạn về. Tốn điện, không sạch nhà." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Không dùng chế độ hẹn giờ:" }, { type: "text", text: " Tính năng hữu ích nhất của robot mà nhiều người không dùng. Hẹn robot chạy lúc bạn đi làm, về nhà đã sạch." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Mua robot quá rẻ rồi thất vọng:" }, { type: "text", text: " Robot <3 triệu thường không có LiDAR, va đập khắp nơi, không nhớ bản đồ. Đầu tư ít nhất 5-7 triệu cho 1 con có LiDAR + app tốt." }] }] },
        ] },
      ]
    }),
    excerpt: "5 sai lầm phổ biến: không vệ sinh cảm biến, không thay phụ kiện, để dây sạc trên sàn, không dùng hẹn giờ, mua robot quá rẻ. Có thể bạn đang mắc phải!",
    prefix: "Hướng dẫn",
    categorySlug: "guides",
    heatScore: 60,
    viewCount: 3500,
    likeCount: 72,
    favCount: 33,
    replyCount: 28,
    geoFlag: "DE" as const,
  },
];

async function main() {
  console.log("Importing articles batch 2...\n");

  const demoUser = await prisma.user.findUnique({ where: { email: "demo@robovac-forum.com" } });
  const adminUser = await prisma.user.findUnique({ where: { email: "admin@robovac-forum.com" } });
  const germanUser = await prisma.user.findUnique({ where: { email: "german@robovac-forum.com" } });

  if (!demoUser || !adminUser || !germanUser) {
    console.log("Users not found. Run seed.ts first.");
    return;
  }

  const authors = [demoUser, adminUser, germanUser];
  const categories = await prisma.category.findMany();
  const catMap = new Map(categories.map((c) => [c.slug, c]));

  let imported = 0;

  for (const article of ARTICLES) {
    const category = catMap.get(article.categorySlug);
    if (!category) { console.log(`  SKIP: category "${article.categorySlug}"`); continue; }

    const existing = await prisma.thread.findFirst({ where: { title: article.title } });
    if (existing) { console.log(`  SKIP (exists): ${article.title.slice(0, 50)}...`); continue; }

    const author = authors[imported % authors.length];

    await prisma.thread.create({
      data: {
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        categoryId: category.id,
        authorId: author.id,
        prefix: article.prefix ?? undefined,
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

    await prisma.category.update({
      where: { id: category.id },
      data: { threadCount: { increment: 1 }, postCount: { increment: 1 } },
    });

    console.log(`  ✓ ${article.title.slice(0, 70)}...`);
    imported++;
  }

  console.log(`\nDone! Imported ${imported} articles (batch 2).`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
