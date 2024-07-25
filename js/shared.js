import database from './api.js';

const generateRandomID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-';
  const charactersLength = characters.length;
  const randomStringLength = Math.floor(Math.random() * (78 - 7)) + 6;
  let result = `${new Date().getTime() * 23}`;
  for (let i = 0; i < randomStringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += new Date().getTime() * 24;
  return result;
};

async function getAllFromDatabase(tableName) {
  const { data, error } = await database.from(tableName).select();
  if (error) {
    console.error('Error getting data', error);
    return error;
  }
  return data;
}

async function getOneFromDatabase(tableName, ID) {
  const { data, error } = await database.from(tableName).select().eq('id', ID).single();
  if (error) {
    console.error('Error getting data', error);
    return error;
  }
  return data;
}

async function addToDatabase(tableName, items) {
  const { error } = await database.from(tableName).insert(items);
  if (error) {
    console.error('Error adding data', error);
    return error;
  }
  return null;
}

async function updateInDatabase(tableName, items, ID) {
  const { error } = await database.from(tableName).update(items).eq('id', ID);
  if (error) {
    console.error('Error updating data', error);
    return error;
  }
  return null;
}

async function deleteFromDatabase(tableName, ID) {
  const { error } = await database.from(tableName).delete().eq('id', ID);
  if (error) {
    console.error('Error deleting data', error);
    return error;
  }
  return null;
}

const removeLoader = () => {
  document.body.classList.remove('h-0');
  document.body.classList.remove('overflow-y-hidden');
  document.querySelector('.loader-wrapper').classList.add('hide');
};

const getFinalPrice = (price, discount) => {
  return discount === 100 ? 0 : (price * (100 - discount)) / 100;
};

window.addCourseToCart = (id) => {
  console.log(id);
};

// Add courses to DOM
const courseTemplate = (course) => {
  let finalPriceTemplate = null;
  if (course.discountPercent === 100) {
    finalPriceTemplate = `
          <div class="text-left">
              <span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>
            </div>`;
  } else {
    finalPriceTemplate = `
          <div class="flex items-end">
              <span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>
              <svg class="size-7 mr-[-3px]">
                <use href="#toman"></use>
              </svg>
            </div>`;
  }
  const courseTemplateHtml = `            
                <!-- Course -->
            <div class="${course.courseWrapperClass} group">
              <!-- Course Banner -->
              <div class="h-40 rounded-b-2xl overflow-hidden border-b border-b-slate-200 dark:border-b-slate-700">
                <a class="size-full" href="./course.html">
                  <img class="size-full object-cover" loading="lazy" src="${course.src}" alt="${course.name}" />
                </a>
                <!-- Discount Percent -->
                <div class="absolute top-3 left-0 flex items-end justify-center w-10 h-6 theme-bg-color text-white rounded-r-full">${course.discountPercent}%</div>
              </div>
              <!-- End of Course Banner -->
              <div class="h-[122px] px-4 space-y-2 mt-4">
                <!-- Course Name -->
                <a class="block font-VazirBold text-lg max-h-[60px] hover:theme-text-color transition-all line-clamp-2" href="./course.html">${course.name}</a>
                <!-- Course Description -->
                <p class="line-clamp-2 font-VazirLight max-h-12">${course.description}</p>
              </div>
              <!-- Course Teacher -->
              <a class="flex justify-center bg-slate-100 dark:bg-slate-700 md:hover:bg-slate-200 dark:md:hover:bg-slate-600 absolute left-0 right-0 bottom-[86px] mx-auto w-48 py-2 rounded-full transition-colors" href="./teacher.html">${course.teacher}</a>
              <!-- Students && Rating && Price  -->
              <div class="flex items-end justify-between px-4 pt-8 mt-8 border-t border-t-slate-200 dark:border-t-slate-700">
                <!-- Students && Rating  -->
                <div>
                  <!-- Students -->
                  <div class="flex gap-1 mb-0.5">
                    <svg class="size-5 theme-text-color">
                      <use href="#user-group"></use>
                    </svg>
                    <span>${course.students}</span>
                  </div>
                  <!-- End of Students -->
                  <!-- Rating -->
                  <div class="flex gap-1">
                    <svg class="size-5 text-yellow-500">
                      <use href="#star"></use>
                    </svg>
                    <span>${course.rate}</span>
                  </div>
                  <!-- End of Rating -->
                </div>
                <!-- End of Students && Rating  -->
                <!-- Course Price -->
                <div>
                  <!-- Price -->
                  <span class="text-sm line-through dark:text-slate-200 decoration-red-400">${course.price}</span>
                  <!-- Final Price -->
                    ${finalPriceTemplate}
                </div>
                <!-- End of Course Price -->
              </div>
              <!-- End of Students && Rating && Price  -->
              <!-- Cart Btn  -->
              <div class="absolute mx-auto left-0 right-0 bottom-2 lg:-bottom-10 lg:group-hover:bottom-2 flex items-center justify-center w-10 h-10 theme-bg-color hover:theme-hover-bg-color text-white rounded-full transition-all md:cursor-pointer" onclick="addCourseToCart('${course.id}')">
                <svg class="size-6">
                  <use href="#shopping-bag"></use>
                </svg>
              </div>
              <!-- End of Course -->
            </div>`;
  return courseTemplateHtml;
};

const addCoursesToDOM = (courses, coursesWrapper, isSwiper = false) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-card' : 'course-card';
  coursesWrapper.innerHTML = '';
  let newCourse = null;
  let finalPrice = null;
  courses.forEach((course) => {
    finalPrice = getFinalPrice(course.price, course.discount) ? getFinalPrice(course.price, course.discount).toLocaleString('fa-IR') : 'رایگان';
    newCourse = {
      id: course.id,
      name: course.name,
      description: course.description,
      src: course.src,
      teacher: course.teacher,
      students: course.students,
      rate: course.rate,
      discountPercent: course.discount,
      price: course.price.toLocaleString('fa-IR'),
      finalPrice: finalPrice,
      courseWrapperClass,
    };
    coursesWrapper.insertAdjacentHTML('beforeend', courseTemplate(newCourse));
  });
};

const formatDate = (date) => {
  const dateList = new Date(date).toLocaleDateString('fa-IR').split('/');
  const year = dateList[0];
  const month = dateList[1].padStart(2, '۰');
  const day = dateList[2].padStart(2, '۰');
  return `${year}/${month}/${day}`;
};

export { removeLoader, getAllFromDatabase, addToDatabase, updateInDatabase, deleteFromDatabase, generateRandomID, getFinalPrice, addCoursesToDOM, formatDate };
