# Cors-demo-D18CNTT17B
Báo cáo bài tập lớn: ĐỀ TÀI: NGHIÊN CỨU LỖ HỔNG CORS MISCONFIGURATION VÀ THỰC NGHIỆM KHAI THÁC DATA EXFILTRATION THÔNG QUA ACCESS-CONTROL-ALLOW-ORIGIN. 
Nhóm thực hiện: 
- Đinh Chí Hùng (MSV: 2382160008)
- Đỗ Văn Chức (MSV: 2382160004)
- Hoàng Minh Đức (MSV: 2382160005)
PHÂN CHIA CÔNG VIỆC :
### PHÂN CHIA CÔNG VIỆC

| STT | Họ và tên | Mã sinh viên | Nhiệm vụ chính | Tỷ trọng |
|:---:|:---|:---:|:---|:---:|
| 1 | Đinh Chí Hùng | 2382160008 | Xây dựng kiến trúc hệ thống, xử lý các phần code phức tạp (Backend, logic chính), review code, tổng hợp và biên tập nội dung báo cáo cuối cùng. | 50% |
| 2 | Đỗ Văn Chức | 2382160004 |Dựng giao diện, thiết kế các thành phần hiển thị, viết phần "Mô tả giao diện" trong báo cáo.  | 25% |
| 3 | Hoàng Minh Đức | 2382160005 | Sưu tầm tài liệu lý thuyết, trình bày văn bản (format, chỉnh sửa), thực hiện kiểm thử và ghi lại kết quả | 25% |

######## CÁC BƯỚC THỰC HIỆN 
Bước 1: Khởi tạo nạn nhân API server.js có lỗ hổng 

Bước 2: Chạy server server.js (đang để Access-Control-Allow-Origin: * hoặc không giới hạn origin).
![API chạy thành công](https://github.com/user-attachments/assets/37c8bc56-a3f1-4578-a3f5-53de100e06ce)

Bước 3: xây dựng hacker Server nhằm mô phỏng quá trình Data Exfiltration (đánh cắp và chuyển dữ liệu ra ngoài hệ thống)--tạo file hacker.js để xây dựng máy chủ của kẻ tấn công. 


Bước 4: Khởi động đồng thời server.js và Hacker.js hoạt động trên 2 cổng 3000 vầ cổng 4000: 
![server.js](https://github.com/user-attachments/assets/b945c43a-fb9b-4570-b032-e0c37dea5d74)

![hacker.js](https://github.com/user-attachments/assets/bb21dc0f-595e-4ce2-8f20-28c21ef03cf8)

Bước 5: Mở website độc hại (evil.html) trên trình duyệt (Chrome/Edge).

![Website độc hại thực hiện đọc dữ liệu từ Server.js](https://github.com/user-attachments/assets/bcc8c2a5-ac40-49bc-93bd-e41a6e7edf5a)

Bước 6: Nhấn F12 để mở Developer Tools, chọn tab Network và tab Console.

-tab Network khi request từ website độc hại gửi đến server nạn nhân thành công (hiện trạng thái 200 OK).

![image](https://github.com/user-attachments/assets/06d9cef4-50c0-46ad-bf0a-c00f3f8fe37f)

-Mở tab Response trong request đó để thấy rõ dữ liệu nhạy cảm (tên, email, v.v.) đã bị đánh cắp thành công. 

![kết quả](https://github.com/user-attachments/assets/3e85d9d8-d66d-4167-9d45-24dbc38aeb82)
*Hình: Kết quả phân tích lỗ hổng bảo mật tại console của trình duyệt.*

-vùng bôi xanh vào phần header Access-Control-Allow-Origin: * "thủ phạm" cốt lõi gây ra lỗ hổng CORS

![lỗ hổng](https://github.com/user-attachments/assets/4895073f-1dab-4ed7-af89-f46aa83ea64a)

- Trên CMD hacker.js cũng sẽ hiện dữ liệu : 

![image](https://github.com/user-attachments/assets/cc30e3a7-5f65-481b-a376-c87c4234b4a9)


##### KHẮC PHỤC  (Sau khi fix) hacker sẽ không truy cập được vào đánh cắp thông tin !
Đây là phần chứng minh giải pháp của nhóm chúng em  hoạt động hiệu quả.

Bước 1: Sửa file server.js để whitelist chỉ nhận http://localhost:5500 (hoặc domain hợp lệ).  

![image](https://github.com/user-attachments/assets/56b68581-f280-4245-a591-ed20b69814be)


+ Kết quả kiểm chứng (Demo)
+ Trạng thái sau khi fix: Khi truy cập từ website độc hại (evil.html) không thuộc whitelist, trình duyệt sẽ tự động chặn request.

+ Bằng chứng: Trong tab Console của trình duyệt sẽ hiển thị lỗi đỏ: "Access to XMLHttpRequest at... blocked by CORS policy". Điều này xác nhận hệ thống đã được bảo vệ thành công trước hành vi truy cập trái phép từ các domain lạ.

+ "Thay vì dùng wildcard () vốn cho phép tất cả, nhóm em đã triển khai danh sách whitelist. Như vậy, chỉ những domain được cấp phép mới nhận được header Access-Control-Allow-Origin từ server, giúp ngăn chặn triệt để việc dữ liệu bị đánh cắp bởi các trang web độc hại."*

Bước 2: Refresh lại website độc hại (evil.html).  "KHI TRUY CẬP SẼ KHÔNG CÒN HIỂN THỊ THÔNG TIN NỮA"

![image](https://github.com/user-attachments/assets/b37ce4bd-a050-42fa-add7-ab28277de688)

Bước 3: Sau khi khắc phục 
Trước khi khắc phục (có lỗ hổng)
✅ user → 200 OK (màu xanh)
✅ steal → 200 OK
✅ Hacker nhận được dữ liệu
Sau khi khắc phục
❌ user → màu đỏ (bị CORS chặn)
❌ Không đọc được JSON
❌ steal không được gửi
✅ Hacker không nhận được dữ liệu

![Minh chứng lỗi bị chặn](https://github.com/user-attachments/assets/dc15c5ad-fdc5-460b-ad2f-4c27a055c19c)

Sau khi cấu hình CORS chỉ cho phép các Origin hợp lệ truy cập, trình duyệt đã từ chối yêu cầu từ website độc hại (http://127.0.0.1:5500). Request /api/user bị chặn bởi chính sách CORS, dữ liệu không còn bị đọc và gửi sang máy chủ của kẻ tấn công. Điều này chứng minh biện pháp khắc phục đã loại bỏ lỗ hổng CORS Misconfiguration.

![image](https://github.com/user-attachments/assets/badff8dc-8e76-45f6-bc8a-89584e2107df)

"Thưa thầy, đây là kết quả sau khi nhóm em đã áp dụng cơ chế Whitelist để bảo mật API.

Tại sao không thấy Access-Control-Allow-Origin?
'Như thầy thấy trong phần Response Headers, server đã hoàn toàn loại bỏ header Access-Control-Allow-Origin. Đây là hành động chủ đích của nhóm em.'

Chứng minh đã chặn được Hacker:
'Khi một trang web độc hại (như evil.html) gửi request tới API, server kiểm tra thấy Origin không nằm trong danh sách Whitelist, nên nó từ chối gửi kèm header Access-Control-Allow-Origin.

Khi không có header này, trình duyệt của người dùng sẽ tự động chặn (Block) toàn bộ dữ liệu phản hồi lại, không cho trang web độc hại đọc được bất kỳ thông tin nào từ API của chúng em.'

Kết luận:
'Việc header Access-Control-Allow-Origin này biến mất chính là minh chứng cho thấy: Server đã từ chối cấp quyền truy cập cho nguồn lạ. Đây là cơ chế "Default Deny" (mặc định từ chối) trong bảo mật, đảm bảo dữ liệu của chúng em hoàn toàn an toàn trước mọi truy cập trái phép từ bên ngoài.'


         ###### NHÓM EM CẢM ƠN THẦY ĐÃ XEM QUA BÀI LÀM CỦA NHÓM EM Ạ! TRONG BÀI CÓ ĐÔI CHÚT CHƯA TỐT MONG THẦY CHÂM TRƯỚC CHO CHÚNG EM Ạ!###
