let userInfo;
let user;
let allBookingData = [];
let allInhouseData = [];
//booking related data
let bookingForm = document.querySelector(".booking-form");
let allBookingInput = bookingForm.querySelectorAll("input");
let bookingTextarea = bookingForm.querySelector("textarea");
let bListTBody = document.querySelector(".booking-list");
let regBbtn = document.querySelector(".regB-btn");
// In House related data
let inHouseForm = document.querySelector(".inhouse-form");
let allinHInput = inHouseForm.querySelectorAll("input");
let inhouseTextarea = inHouseForm.querySelector("textarea");
let inHListTBody = document.querySelector(".inhouse-list");
let inHousebtn = document.querySelector(".inhouse-reg-btn");
let btnClose = document.querySelectorAll(".btn-close");
let logOutBtn = document.querySelector(".logout-btn");
let navBrand = document.querySelector(".navbar-brand");
//check user is login ro not
if (sessionStorage.getItem("__auth__") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__auth__"));
navBrand.innerHTML = userInfo.hotelname;
user = userInfo.email.split("@")[0];
// getting data from storage
const fetchdata = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};
allBookingData = fetchdata(user + "_allBdata");
allInhouseData = fetchdata(user + "_allHdata");
//formate date function
const formatDate = (data, isTime) => {
  const date = new Date(data);
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  mm = mm < 10 ? "0" + mm : mm;
  let dd = date.getDate();
  dd = dd < 10 ? "0" + dd : dd;
  let time = date.toLocaleTimeString();
  return `${dd}-${mm}-${yy} ${isTime ? time : ""}`;
};
// Registration
const registrationFunc = (arr, inputs, textarea, key) => {
  let data = { notice: textarea.value, createdAt: new Date() };
  for (let ele of inputs) {
    let key = ele.name;
    data[key] = ele.value;
  }
  arr.push(data);
  localStorage.setItem(key, JSON.stringify(arr));
  swal("Good Job !", "Booking Success", "success");
};
// show data
const showData = (ele, arr, key) => {
  ele.innerHTML = "";
  arr.forEach((item, idx) => {
    ele.innerHTML += `<tr>
                               <td class="text-nowrap">${idx + 1}</td>
                               <td class="text-nowrap">${item.location}</td>
                               <td class="text-nowrap">${item.roomNo}</td>
                               <td class="text-nowrap">${item.fullname}</td>
                               <td class="text-nowrap">${formatDate(
                                 item.checkIndate
                               )}</td>
                               <td class="text-nowrap">${formatDate(
                                 item.checkOutDate
                               )}</td>
                               <td class="text-nowrap">${item.totalPeople}</td>
                               <td class="text-nowrap">${item.mobile}</td>
                               <td class="text-nowrap">${item.price}</td>
                               <td class="text-nowrap">${item.notice}</td>
                               <td class="text-nowrap">${formatDate(
                                 item.createdAt,
                                 true
                               )}</td>
                               <td class="text-nowrap">
                                  <button class="edit-btn btn px-2 p-1 me-1 btn-primary">
                                   <i class="fa fa-edit"></i></button
                                  ><button class="checkin-btn btn px-2 p-1 me-1 btn-info text-white">
                                    <i class="fa fa-check"></i></button
                                  ><button class="del-btn btn px-2 p-1 btn-danger">
                                    <i class="fa fa-trash"></i>
                                  </button>
                                </td>
                             </tr>`;
  });
  delFunc(ele, arr, key);
  editFunc(ele, arr, key);
};
//logout
logOutBtn.onclick = () => {
  logOutBtn.innerHTML = "Please wait...";
  setTimeout(() => {
    logOutBtn.innerHTML = "Logout";
    sessionStorage.removeItem("__auth__");
    window.location = "../index.html";
  }, 2000);
};
//Booking Registration
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(
    allBookingData,
    allBookingInput,
    bookingTextarea,
    user + "_allBdata"
  );
  bookingForm.reset("");
  btnClose[0].click();
  showData(bListTBody, allBookingData, user + "_allBdata");
};
// In House Registration
inHouseForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(
    allInhouseData,
    allinHInput,
    inhouseTextarea,
    user + "_allHdata"
  );
  inHouseForm.reset("");
  btnClose[1].click();
  showData(inHListTBody, allInhouseData, user + "_allHdata");
};
// Deletion
const delFunc = (ele, arr, key) => {
  let alldelBtn = ele.querySelectorAll(".del-btn");
  alldelBtn.forEach((btn, idx) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          arr.splice(idx, 1);
          localStorage.setItem(key, JSON.stringify(arr));
          showData(ele, arr, key);
          swal("Poof! Your Data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Data is safe!");
        }
      });
    };
  });
};
// Updation
const editFunc = (ele, arr, key) => {
  let alleditBtn = ele.querySelectorAll(".edit-btn");
  alleditBtn.forEach((btn, idx) => {
    btn.onclick = () => {
      let tmp = key.split("_")[1];
      tmp == "allBdata" ? regBbtn.click() : inHousebtn.click();
      let allBtn =
        tmp == "allBdata"
          ? bookingForm.querySelectorAll("button")
          : inHouseForm.querySelectorAll("button");
      let allInput =
        tmp == "allBdata"
          ? bookingForm.querySelectorAll("input")
          : inHouseForm.querySelectorAll("input");
      let textarea =
        tmp == "allBdata"
          ? bookingForm.querySelector("textarea")
          : inHouseForm.querySelector("textarea");
      allBtn[0].classList.add("d-none");
      allBtn[1].classList.remove("d-none");
      let obj = arr[idx];
      allInput[0].value = obj.fullname;
      allInput[1].value = obj.location;
      allInput[2].value = obj.roomNo;
      allInput[3].value = obj.totalPeople;
      allInput[4].value = obj.checkIndate;
      allInput[5].value = obj.checkOutDate;
      allInput[6].value = obj.price;
      allInput[7].value = obj.mobile;
      textarea.value = obj.notice;
      allBtn[1].onclick = () => {
        let formData = {
          notice: textarea.value,
          createdAt: new Date(),
        };
        for (let ele of allInput) {
          let key = ele.name;
          formData[key] = ele.value;
        }
        arr[idx] = formData;
        localStorage.setItem(key, JSON.stringify(arr));
        allBtn[0].classList.remove("d-none");
        allBtn[1].classList.add("d-none");
        tmp == "allBdata" ? btnClose[0].click() : btnClose[1].click();
        swal("Data Updated Successfully");
        showData(ele, arr, key);
      };
    };
  });
};
showData(inHListTBody, allInhouseData, user + "_allHdata");
showData(bListTBody, allBookingData, user + "_allBdata");
