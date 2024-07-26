// shared.js - index.js
const courseCardTemplate = (course) => {
  let finalPriceTemplate = null;
  if (course.discountPercent === 100) {
    finalPriceTemplate = `
          <div class="text-left">
              <span class="sm:text-lg/5 text-green-600 dark:text-green-400">${course.finalPrice}</span>
            </div>`;
  } else {
    finalPriceTemplate = `
          <div class="flex items-end">
              <span class="sm:text-lg/5 text-green-600 dark:text-green-400">${course.finalPrice}</span>
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
                <a class="size-full" href="./course.html?course=${course.slug}">
                  <img class="size-full object-cover" loading="lazy" src="${course.src}" alt="${course.name}" />
                </a>
                <!-- Discount Percent -->
                <div class="absolute top-3 left-0 flex items-end justify-center w-10 h-6 theme-bg-color text-white rounded-r-full">${course.discountPercent}%</div>
              </div>
              <!-- End of Course Banner -->
              <div class="h-[122px] px-4 space-y-2 mt-4">
                <!-- Course Name -->
                <a class="block font-VazirBold text-lg max-h-[60px] hover:theme-text-color transition-all line-clamp-2" href="./course.html?course=${course.slug}">${course.name}</a>
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
                  <span class="text-sm sm:text-base line-through text-slate-500 dark:text-slate-300 decoration-red-400">${course.price}</span>
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

// index.js
const blogCardTemplate = (blog) => {
  const template = `
              <!-- Blog -->
            <div class="p-4 bg-white dark:bg-slate-800 shadow dark:shadow-none dark:border dark:border-slate-700 rounded-2xl group relative overflow-hidden">
              <!-- Blog Banner -->
              <a href="./blog.html" class="block w-full h-44 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden relative">
                <img class="size-full object-cover" loading="lazy" src="${blog.src}" alt="${blog.title}" />
                <svg class="hidden md:block absolute size-full inset-0 theme-bg-color text-white p-3 opacity-80 group-hover:opacity-0 group-hover:translate-y-44 duration-500 rounded-2xl transition-all">
                  <use href="#logo"></use>
                </svg>
              </a>
              <!-- End of Blag Banner -->
              <!-- Blog Title -->
              <a class="block font-VazirBold text-lg h-[60px] hover:theme-text-color transition-all line-clamp-2 mt-4" href="./blog.html">${blog.title}</a>
              <!-- End of Blog Title -->
              <!-- Writer and Category -->
              <div class="flex items-center justify-between gap-2 font-VazirBold text-xs border-t border-t-slate-200 dark:border-t-slate-700 mt-4 pt-4">
                <!-- Writer -->
                <div class="flex items-center gap-1">
                  <svg class="size-4 theme-text-color">
                    <use href="#pencil-square"></use>
                  </svg>
                  <span>${blog.writer}</span>
                </div>
                <!-- Category -->
                <a href="./blogs" class="flex justify-center theme-text-color bg-slate-100 dark:bg-slate-700 md:hover:bg-slate-200 dark:md:hover:bg-slate-600 py-0.5 px-2 rounded-full transition-colors">${blog.subject}</a>
              </div>
              <!-- End of Writer and Category -->
              <!-- Likes & Comments && Time -->
              <div class="flex items-center justify-between gap-2 font-VazirBold text-xs my-4">
                <!-- Likes and Comments -->
                <div class="flex items-center gap-2">
                  <!-- Likes -->
                  <div class="flex items-center gap-1">
                    <svg class="size-4 text-rose-500">
                      <use href="#heart"></use>
                    </svg>
                    <span>${blog.likes}</span>
                  </div>
                  <!-- Comments -->
                  <div class="flex items-center gap-1">
                    <svg class="size-4 theme-text-color">
                      <use href="#chat-bubble-left-ellipsis"></use>
                    </svg>
                    <span>${blog.comments}</span>
                  </div>
                </div>
                <!-- Time -->
                <div href="./blogs" class="flex items-center gap-1">
                  <svg class="size-4 theme-text-color">
                    <use href="#timer"></use>
                  </svg>
                  <span>زمان مطالعه: <span>${blog.readingTime}</span> دقیقه</span>
                </div>
              </div>
              <!-- End of Likes & Comments && Time -->
              <!-- Date -->
              <div href="./blogs" class="flex items-center gap-1 font-VazirBold text-xs">
                <svg class="size-4 theme-text-color">
                  <use href="#calendar-days"></use>
                </svg>
                <span>${blog.date}</span>
              </div>
              <!-- End of Date -->
              <!-- Blog Link-->
              <a class="blog-card-link group/btn" href="./blog.html">
                <span class="transition-colors">مطالعه مقاله</span>
                <svg class="size-4 md:absolute md:left-4 md:group-hover/btn:left-1 transition-all">
                  <use href="#left-arrow"></use>
                </svg>
              </a>
            </div>`;
  return template;
};

// course.js
const courseInfoTemplate = (course) => {
  let finalPriceTemplate = null;
  if (course.discountPercent === 100) {
    finalPriceTemplate = ` <span class="font-VazirMedium text-green-600 dark:text-green-400">${course.finalPrice}</span>`;
  } else {
    finalPriceTemplate = `
            <div class="flex items-end font-VazirMedium">
              <span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>
              <svg class="size-7 sm:size-8 lg:size-9 mr-[-3px]">
                <use href="#toman"></use>
              </svg>
            </div>`;
  }

  const template = `
    <!-- Banner -->
    <div class="lg:order-2 lg:w-1/2 lg:h[344px] lg:h-[356px] overflow-hidden rounded-2xl">
      <img class="size-full" src="${course.src}" alt="${course.name}" />
    </div>
    <!-- End of Banner -->
    <!-- Course Info -->
    <div class="bg-white p-5 lg:w-1/2 dark:bg-slate-800 rounded-2xl shadow">
      <!-- Course name -->
      <h1 class="lg:order-1 text-[22px] xs:text-2xl md:text-3xl font-VazirBlack">${course.name}</h1>
      <!-- Course Caption -->
      <p class="sm:text-lg xl:text-xl/8 font-VazirLight line-clamp-3 mt-3 sm:mt-4 md:mt-5">
      ${course.description}
      </p>
      <div class="2xl:flex justify-between mt-3 sm:mt-4 md:mt-5 2xl:mt-9">
        <!-- Teacher and Discount -->
        <div class="sm:flex justify-between items-center 2xl:flex-col 2xl:items-start 2xl:gap-4">
          <!-- Teacher -->
          <a href="./teacher.html" class="font-VazirMedium md:hover:theme-text-color transition-colors flex justify-center items-center sm:justify-start gap-1 bg-slate-100 dark:bg-slate-700 sm:bg-transparent dark:sm:bg-transparent mx-auto sm:mx-0 w-48 sm:w-auto py-2 sm:py-0 rounded-full">
            <svg class="size-5 hidden sm:block">
              <use href="#user"></use>
            </svg>
            <span>${course.teacher}</span>
          </a>
          <!-- End of Teacher -->
          <!-- Discount -->
          <div class="sm:text-lg font-VazirLight text-center theme-bg-color-10 p-2 lg:px-1 xl:px-2 rounded-2xl mt-4 sm:mt-0">
            <p class="font-VazirBold theme-text-color"><span>${course.discountPercent}%</span> تخفیف ویژه</p>
            <div class="flex items-center justify-center m-1">
              <div class="pl-3 ml-3 lg:pl-2.5 lg:ml-2.5 xl:pl-3 xl:ml-3 border-l"><span class="font-VazirBold">2</span> روز</div>
              <div class="pl-3 ml-3 lg:pl-2.5 lg:ml-2.5 xl:pl-3 xl:ml-3 border-l"><span class="font-VazirBold">12</span> ساعت</div>
              <div class="pl-3 ml-3 lg:pl-2.5 lg:ml-2.5 xl:pl-3 xl:ml-3 border-l border-l-slate-200 dark:border-l-slate-700"><span class="font-VazirBold">54</span> دقیقه</div>
              <div><span class="font-VazirBold">29</span> ثانیه</div>
            </div>
          </div>
          <!-- End of Discount -->
        </div>
        <!-- End of Teacher and Discount -->
        <!-- Purchase and Price -->
        <div class="flex flex-col-reverse sm:flex-row gap-3 justify-between items-center mt-4 md:mt-6 2xl:flex-col-reverse 2xl:items-start 2xl:gap-4">
          <!-- Purchase Btn -->
          <div class="btn w-full sm:w-auto 2xl:w-full theme-bg-color md:hover:theme-hover-bg-color md:cursor-pointer">ثبت نام در دوره</div>
          <!-- Price -->
          <div class="flex items-end gap-2 text-lg sm:text-xl lg:text-2xl">
            <!-- Primary Price -->
            <span class="line-through dark:text-slate-300 text-slate-500 decoration-red-400">${course.price}</span>
            <!-- Final Price -->
              ${finalPriceTemplate}
            <!-- End of Final Price -->
          </div>
          <!-- End of Price -->
        </div>
        <!-- End of Price and Purchase -->
      </div>
    </div>
    <!-- End of Course Info-->`;

  return template;
};

// course.js
const courseDataTemplate = (course) => {
  const template = `
          <div class="flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl p-1 sm:p-2 text-sm shadow">
            <svg class="size-8 sm:size-10 theme-text-color">
              <use href="#timer"></use>
            </svg>
            <span class="font-VazirLight mt-2 mb-1.5">مدت دوره</span>
            <span class="font-VazirBold">${course.videosLength}</span>
          </div>
          <div class="flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl p-1 sm:p-2 text-sm shadow">
            <svg class="size-8 sm:size-10 theme-text-color">
              <use href="#clipboard-document-check"></use>
            </svg>
            <span class="font-VazirLight mt-2 mb-1.5">وضعیت دوره</span>
            <span class="font-VazirBold">${course.situation}</span>
          </div>
          <div class="flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl p-1 sm:p-2 text-sm shadow">
            <svg class="size-8 sm:size-10 theme-text-color">
              <use href="#calendar-days"></use>
            </svg>
            <span class="font-VazirLight mt-2 mb-1.5">آخرین آپدیت </span>
            <span class="font-VazirBold">${course.date}</span>
          </div>
          <div class="flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl p-1 sm:p-2 text-sm shadow">
            <svg class="size-8 sm:size-10 theme-text-color">
              <use href="#queue-list"></use>
            </svg>
            <span class="font-VazirLight mt-2 mb-1.5">تعداد جلسات</span>
            <span class="font-VazirBold">${course.sessionsCount}</span>
          </div>
          <div class="flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl p-1 sm:p-2 text-sm shadow">
            <svg class="size-8 sm:size-10 theme-text-color">
              <use href="#user-group"></use>
            </svg>
            <span class="font-VazirLight mt-2 mb-1.5">دانشجو</span>
            <span class="font-VazirBold">${course.students}</span>
          </div>
          <div class="flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl p-1 sm:p-2 text-sm shadow">
            <svg class="size-8 sm:size-10 theme-text-color">
              <use href="#champion"></use>
            </svg>
            <span class="font-VazirLight mt-2 mb-1.5">رضایت</span>
            <span class="font-VazirBold">${course.ratePercent}</span>
          </div>`;
  return template;
};
export { courseCardTemplate, blogCardTemplate, courseInfoTemplate, courseDataTemplate };
