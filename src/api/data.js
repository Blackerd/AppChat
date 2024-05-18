//       // navigate(`/home?a=${passwordInputState}`);
//       // gửi dữ liệu cho server
//       // fetch(
//       //   `http://localhost:8080/api/user?email=${userNameInputState}&password=${passwordInputState}`
//       // )
//       //   .then((response) => {
//       //     if (!response.ok) {
//       //       throw new Error(
//       //         "Network response was not ok " + response.statusText
//       //       );
//       //     }
//       //     return response.json();
//       //   })
//       //   .then((data) => {
//       //     console.log(data); // Dữ liệu từ server
//       //     console.log("data was send");
//       //   })
//       //   .catch((error) => {
//       //     console.error("There was a problem with the fetch operation:", error);
//       //   });

//       // Dữ liệu gửi đi
//       const data = {
//         email: userNameInputState,
//         pass: passwordInputState,
//       };

//       // Gửi yêu cầu POST bằng fetch
//       fetch("http://localhost:8080/api/save", {
//         method: "POST", // Thiết lập phương thức là POST
//         headers: {
//           "Content-Type": "application/json", // Đặt header Content-Type
//         },
//         body: JSON.stringify(data), // Chuyển dữ liệu thành chuỗi JSON
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(
//               "Network response was not ok " + response.statusText
//             );
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("Success:", data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   };
