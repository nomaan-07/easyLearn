import { formatDate, formatTime } from './../utils/utils.js';

const loginBtnTemplate = (userID) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  let template = '';
  let panelHref = isAdmin ? './admin-panel.html' : './account.html';
  if (userID) {
    template = `
      <a href="${panelHref}" class="btn gap-3 theme-bg-color lg:hover:theme-hover-bg-color select-none">
        <svg class="size-6">
          <use href="#user"></use>
        </svg>
        <span>پنل کاربری</span>
      </a>`;
  } else {
    template = `<a href="./auth.html?operation=signup" class="btn theme-bg-color lg:hover:theme-hover-bg-color select-none">ورود | ثبت نام</a>`;
  }
  return template;
};

// shared.js - index.js
const courseCardTemplate = (course) => {
  let purchaseBtnHiddenClass = 'flex ';
  let studentBadgeHiddenClass = 'hidden ';
  let discountHiddenClass = 'hidden ';

  let finalPriceTemplate = null;

  if (course.isPurchased) {
    purchaseBtnHiddenClass = 'hidden ';
    studentBadgeHiddenClass = '';
  }
  if (course.discountPercent) discountHiddenClass = '';

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
  const template = `            
                <!-- Course -->
            <div class="${course.courseWrapperClass} group">
              <!-- Course Banner -->
              <div class="h-40 rounded-b-2xl overflow-hidden border-b border-b-slate-200 dark:border-b-slate-700 relative">
                <a class="size-full" href="./course.html?course=${course.slug}">
                  <img class="size-full object-cover" loading="lazy" src="${course.src}" alt="${course.name}" />
                </a>
                <!-- Discount Percent -->
                <div class="${discountHiddenClass}absolute top-3 left-0 flex items-end justify-center w-10 h-6 theme-bg-color text-white rounded-r-full">${course.discountPercent}%</div>
                <!-- End of Discount Percent -->
                <!-- Student Badge --> 
                <span class="${studentBadgeHiddenClass}theme-bg-color p-1 text-sm absolute mx-auto bottom-0 rounded-tl-xl text-white">دانشجوی دوره اید.</span>
                <!-- End of Student Badge --> 
              </div>
              <!-- End of Course Banner -->
              <div class="h-[122px] px-4 space-y-2 mt-4">
                <!-- Course Name -->
                <a class="block font-VazirBold text-lg max-h-[60px] hover:theme-text-color transition-all line-clamp-2" href="./course.html?course=${course.slug}">${course.name}</a>
                <!-- Course caption -->
                <p class="line-clamp-2 font-VazirLight max-h-12">${course.caption}</p>
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
                  <span class="${discountHiddenClass}text-sm sm:text-base line-through text-slate-500 dark:text-slate-300 decoration-red-400">${course.price}</span>
                  <!-- Final Price -->
                    ${finalPriceTemplate}
                </div>
                <!-- End of Course Price -->
              </div>
              <!-- End of Students && Rating && Price  -->
              <!-- Cart Btn  -->
              <div class="course__add-to-cart-btn ${purchaseBtnHiddenClass}items-center justify-center absolute mx-auto left-0 right-0 bottom-2 lg:-bottom-10 lg:group-hover:bottom-2 w-10 h-10 theme-bg-color hover:theme-hover-bg-color text-white rounded-full transition-all md:cursor-pointer"  data-course_id="${course.id}">
                <svg class="size-6">
                  <use href="#shopping-bag"></use>
                </svg>
              </div>
              <!-- End of Course -->
            </div>`;
  return template;
};

// index.js - blogs.js
const blogCardTemplate = (blog) => {
  const template = `
      <!-- Blog -->
      <div class="p-4 bg-white dark:bg-slate-800 shadow dark:shadow-none dark:border dark:border-slate-700 rounded-2xl group relative overflow-hidden">
        <!-- Blog Banner -->
        <a href="./blog.html?blog=${blog.slug}" class="block w-full h-44 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden relative">
          <img class="size-full object-cover" loading="lazy" src="${blog.image_src}" alt="${blog.title}" />
          <svg class="hidden lg:block absolute size-full inset-0 theme-bg-color text-white p-3 opacity-80 group-hover:opacity-0 group-hover:translate-y-44 duration-500 rounded-2xl transition-all">
            <use href="#logo"></use>
          </svg>
        </a>
        <!-- End of Blag Banner -->
        <!-- Blog Title -->
        <a class="block font-VazirBold text-lg h-[60px] hover:theme-text-color transition-all line-clamp-2 mt-4" href="./blog.html?blog=${blog.slug}">${blog.title}</a>
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
          <a href="./blogs.html?category=${blog.category}" class="flex justify-center theme-text-color bg-slate-100 dark:bg-slate-700 md:hover:bg-slate-200 dark:md:hover:bg-slate-600 py-0.5 px-2 rounded-full transition-colors">${blog.categoryName}</a>
        </div>
        <!-- End of Writer and Category -->
        <!-- Seen & Comments && Time -->
        <div class="flex items-center justify-between gap-2 font-VazirBold text-xs my-4">
          <!-- Seen and Comments -->
          <div class="flex items-center gap-2">
            <!-- Seen -->
            <div class="flex items-center gap-1">
              <svg class="size-4 theme-text-color">
                <use href="#eye"></use>
              </svg>
              <span>${blog.seen}</span>
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
        <!-- End of Seen & Comments && Time -->
        <!-- Date -->
        <div href="./blogs" class="flex items-center gap-1 font-VazirBold text-xs">
          <svg class="size-4 theme-text-color">
            <use href="#calendar-days"></use>
          </svg>
          <span>${blog.date}</span>
        </div>
        <!-- End of Date -->
        <!-- Blog Link-->
        <a class="blog-card-link group/btn" href="./blog.html?blog=${blog.slug}">
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
  const courseStudentsID = course.students_id;
  const price = course.price.toLocaleString('fa-IR');

  let discountHiddenClass = `hidden `;

  let finalPriceTemplate = null;
  let purchaseBtnTemplate = `<div class="course__add-to-cart-btn btn w-full sm:w-auto theme-bg-color md:hover:theme-hover-bg-color md:cursor-pointer" data-course_id="${course.id}">ثبت نام در دوره</div>`;

  if (course.isPurchased) {
    purchaseBtnTemplate = `<p class="theme-text-color font-VazirBold lg:text-lg xl:text-xl">شما دانشجوی دوره اید.</p>`;
  }

  if (course.timestamp) {
    discountHiddenClass = '';
  }

  if (course.discount === 100) {
    finalPriceTemplate = `<span class="font-VazirMedium text-green-600 dark:text-green-400">${course.finalPrice}</span>`;
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
    <div class="lg:order-2 lg:w-1/2 lg:h[344px] lg:h-[356px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
      <img class="size-full" src="${course.image_src}" alt="${course.name}" />
    </div>
    <!-- End of Banner -->
    <!-- Course Info -->
    <div class="lg:order-1 flex flex-col bg-white p-5 lg:w-1/2 dark:bg-slate-800 rounded-2xl shadow"  data-course_id="${course.id}">
      <!-- Course name -->
      <h1 class="text-[22px] xs:text-2xl md:text-3xl font-VazirBlack">${course.name}</h1>
      <!-- Course Caption -->
      <p class="sm:text-lg xl:text-xl/8 font-VazirLight line-clamp-3 mt-3 sm:mt-4 md:mt-5">
      ${course.caption}
      </p>
      <div class="flex flex-col justify-end flex-grow mt-3 sm:mt-4 md:mt-5 2xl:mt-9">
        <!-- Teacher and Discount -->
        <div class="sm:flex justify-between items-center">
          <!-- Teacher -->
          <a href="./teacher.html" class="font-VazirMedium md:hover:theme-text-color transition-colors flex justify-center items-center sm:justify-start gap-1 bg-slate-100 dark:bg-slate-700 sm:bg-transparent dark:sm:bg-transparent mx-auto sm:mx-0 w-48 sm:w-auto py-2 sm:py-0 rounded-full">
            <svg class="size-5 hidden sm:block shrink-0">
              <use href="#user"></use>
            </svg>
            <span>${course.teacher}</span>
          </a>
          <!-- End of Teacher -->
          <!-- Discount -->
          <div class="${discountHiddenClass}sm:text-lg font-VazirLight text-center theme-bg-color-10 p-2 lg:px-1 xl:px-2 rounded-2xl mt-4 sm:mt-0">
            <p class="font-VazirBold theme-text-color"><span>${course.discount}%</span> تخفیف ویژه</p>
            <div class="flex items-center justify-center m-1">
              <div class="pl-3 ml-3 lg:pl-2.5 lg:ml-2.5 xl:pl-3 xl:ml-3 border-l theme-border-color"><span id="discount-day" class="inline-block w-[22px] md:w-[26px] font-VazirBold">00</span> روز</div>
              <div class="pl-3 ml-3 lg:pl-2.5 lg:ml-2.5 xl:pl-3 xl:ml-3 border-l theme-border-color"><span id="discount-hour" class="inline-block w-[22px] md:w-[26px] font-VazirBold">00</span> ساعت</div>
              <div class="pl-3 ml-3 lg:pl-2.5 lg:ml-2.5 xl:pl-3 xl:ml-3 border-l theme-border-color"><span id="discount-minute" class="inline-block w-[22px] md:w-[26px] font-VazirBold">00</span> دقیقه</div>
              <div><span id="discount-second" class="inline-block w-[22px] md:w-[26px] font-VazirBold theme-text-color">00</span> ثانیه</div>
            </div>
          </div>
          <!-- End of Discount -->
        </div>
        <!-- End of Teacher and Discount -->
        <!-- Purchase and Price -->
        <div class="flex flex-col-reverse sm:flex-row gap-3 justify-between items-center mt-4 md:mt-6">
          <!-- Purchase Btn -->
          ${purchaseBtnTemplate}
          <!-- Price -->
          <div class="flex items-end gap-2 text-lg sm:text-xl lg:text-2xl">
            <!-- Primary Price -->
            <span class="${discountHiddenClass}line-through dark:text-slate-300 text-slate-500 decoration-red-400">${price}</span>
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
            <span class="font-VazirBold">${course.ratePercent}%</span>
          </div>`;
  return template;
};

// utils.js
const headlineTemplate = (headline, sessions, number, headlineID = false) => {
  let activeHeadlineTemplate = headlineID === headline.id ? `<div class="absolute top-7 md:top-9 xl:top-7 right-0 w-3 h-1 rounded-2xl theme-bg-color"></div>` : '';
  let sessionPageClasses = headlineID ? '' : '2xl:flex-row 2xl:items-center 2xl:py-6';

  if (!sessions) {
    sessions = '<p class ="p-4">هنوز جلسه ای قرار نگرفته است.</p>';
  }
  const template = `
              <div class="w-full overflow-hidden rounded-2xl relative">
                  ${activeHeadlineTemplate}
                  <!-- Headline header -->
                  <div class="headline__title ${sessionPageClasses} bg-slate-100 dark:bg-slate-700 md:hover:theme-text-color">
                    <span class="font-VazirBold sm:text-lg line-clamp-2">${headline.title}</span>
                    <div class="flex items-center justify-end gap-2 text-sm sm:text-base">
                      <span>${number} جلسه</span>
                      <svg class="size-4 sm:size-5 transition-transform">
                        <use href="#chevron-left"></use>
                      </svg>
                    </div>
                  </div>
                  <!-- End of Headline header -->
                  <!-- Headline Body -->
                  <div class="max-h-0 bg-slate-100 dark:bg-slate-700 child-exc-last:border-b child-exc-last:border-b-slate-300 dark:child-exc-last:border-b-slate-600 transition-all">
                    ${sessions}
                  </div>
                  <!-- End of Headline Body -->
                </div>`;
  return template;
};

// utils.js
const courseHeadlineSessionTemplate = (session, number, isPurchased, courseSlug, activeSessionID = false) => {
  let sessionPageClasses = activeSessionID ? '' : '2xl:flex-row 2xl:items-center';

  let sessionActiveClasses = '';
  let sessionActiveNumberClasses = 'bg-white dark:bg-slate-800';

  if (activeSessionID === session.id) {
    sessionActiveClasses = 'border-r border-r-4 theme-border-color';
    sessionActiveNumberClasses = 'theme-bg-color text-white';
  }

  let sessionHref = `href="session.html?id=${session.id}&course=${courseSlug}"`;
  let sessionIcon = 'eye';
  let sessionLockedClasses = 'md:hover:theme-text-color group';

  if (session.isLocked && !isPurchased) {
    sessionHref = '';
    sessionIcon = 'lock-closed';
    sessionLockedClasses = 'theme-bg-color-10 dark:bg-yellow-600/10 cursor-default headline__lock-session';
  }

  const template = `
          <!-- Session -->
        <a ${sessionHref} class="flex flex-col md:flex-row md:items-center xl:flex-col xl:items-stretch ${sessionPageClasses} justify-between gap-y-1 sm:gap-y-2 gap-x-4 w-full p-4 select-none relative ${sessionLockedClasses} ${sessionActiveClasses}">
          <div class="flex items-center gap-2">
            <span class="text-center shrink-0 w-8 h-8 pt-1.5 rounded-lg font-VazirBold md:group-hover:theme-bg-color md:group-hover:text-white transition-colors ${sessionActiveNumberClasses}">${number}</span>
            <span class="sm:text-lg transition-colors line-clamp-2">${session.name}</span>
          </div>
          <div class="flex items-center justify-end gap-2 text-sm sm:text-base transition-colors">
            <span>${session.length}</span>
            <svg class="size-4 sm:size-5">
              <use href="#${sessionIcon}"></use>
            </svg>
          </div>
        </a>
        <!-- End of Session -->`;

  return template;
};

// utils.js
const commentTemplate = (comment, replies) => {
  const message = comment.message.replace(/\n/g, '<br>');
  let date = formatDate(comment.created_at);
  let userAvatar = '';
  if (comment.image_src) {
    userAvatar = `<img class="w-full h-full object-cover" src="${comment.image_src}" alt="${comment.writer}">`;
  } else {
    userAvatar = `
      <div class="flex items-center justify-center size-11 rounded-full bg-slate-500">
        <svg class="size-6 text-slate-100">
          <use href="#user"></use>
        </svg>
      </div>
    `;
  }

  const template = `
    <div class="comment pt-4" id="${comment.id}">
      <div class="comment-header sm:text-xl flex items-center gap-2 w-fit font-VazirMedium theme-bg-color-10 py-px pl-4 rounded-full">
        <div class="flex items-center justify-center size-12 rounded-full overflow-hidden">${userAvatar}</div>
        <span>${comment.writer}</span>
      </div>
      <!-- Comment Content -->
      <div class="w-full text-white bg-slate-500 rounded-2xl px-4 pt-4 pb-1 resize-none overflow-hidden mt-4 relative z-20">
        <p>${message}</p>
        <!-- Comment Info -->
        <div class="flex items-end border-t border-t-slate-200 dark:border-slate-600 justify-between flex-wrap gap-2 mt-2 pt-1">
          <span>${date}</span>
          <!-- reply Comment Btn -->
          <div class="open-reply-btn bg-slate-300 py-px px-1 flex items-center gap-1 self-start select-none rounded-lg theme-text-color md:text-slate-900 md:cursor-pointer md:hover:theme-text-color transition-colors">
            <svg class="size-5">
              <use href="#chat-bubble-left-ellipsis"></use>
            </svg>
            <span>پاسخ</span>
          </div>
        </div>
        <!-- End of Comment Info -->
      </div>
      <!-- End of Comment Content -->
      <!-- Reply comments -->
      <div class="reply-comments px-2">
      ${replies}
      </div>
      <!-- End of Reply comments -->
      <!-- New reply Comment -->
      <div class="reply-comment-wrapper mb-2 mt-6 px-2 max-h-0 overflow-hidden" id="reply-wrapper-comment-${comment.id}">
        <textarea class="reply-comment-textarea w-full h-40 border bg-transparent border-slate-200 dark:border-slate-700 dark:placeholder:text-slate-300 placeholder:text-slate-500 rounded-2xl outline-none p-4 resize-none overflow-hidden" id="reply-textarea-comment-${comment.id}" placeholder="پاسخ..."></textarea>
        <div class="flex items-center justify-end gap-2 select-none">
          <div class="reply-comment-cancel-btn btn border theme-border-color md:hover:theme-bg-color-10 text-inherit md:cursor-pointer">لغو</div>
          <div class="reply-comment-submit-btn btn theme-bg-color border theme-border-color md:hover:theme-hover-bg-color md:cursor-pointer">ثبت</div>
        </div>
      </div>
      <!-- End of New reply Comment -->
      <div></div>
    </div>`;
  return template;
};

// utils.js
const commentReplyTemplate = (reply) => {
  const message = reply.message.replace(/\n/g, '<br>');
  const date = formatDate(reply.created_at);
  let userAvatar = '';
  if (reply.image_src) {
    userAvatar = `<img class="w-full h-full object-cover" src="${reply.image_src}" alt="${reply.writer}">`;
  } else {
    userAvatar = `
      <div class="flex items-center justify-center size-10 rounded-full bg-slate-300 dark:bg-slate-600">
        <svg class="size-6 text-inherit">
          <use href="#user"></use>
        </svg>
      </div>
    `;
  }
  const template = `
  <div class="reply-comment mt-5 bg-slate-200 dark:bg-slate-700 rounded-2xl pt-2 pb-4 px-4 relative z-20">
      <div class="flex items-start gap-2 font-VazirMedium border-b border-b-slate-300 dark:border-b-slate-600">
        <div class="size-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">${userAvatar}</div>
        <div>
          <p class="sm:text-lg">${reply.writer}</p>
          <span>${date}</span>
        </div>
      </div>
      <!-- Reply Comment Content -->
      <div class="w-full resize-none overflow-hidden mt-4 z-20">
        <p>${message}</p>
      </div>
    </div>`;

  return template;
};

// blog.js
const blogTemplate = (blog) => {
  const template = `
              <!-- Title -->
            <div class="flex xs:items-end gap-1 text-xl xs:text-2xl md:text-3xl font-VazirBlack">
              <div class="size-9 sm:size-10 md:size-11 2xl:size-12 animate-float-fast">
                <img class="w-full h-full" src="./images/icons/pencil.png" />
              </div>
              <h1 class="blog__title">${blog.title}</h1>
            </div>
            <!-- End of Title -->
            <!-- Detail -->
            <div class="blog__detail flex flex-col sm:flex-row justify-between flex-wrap gap-3 xs:gap-6 xs:font-VazirMedium text-sm xl:text-base border-y border-y-slate-200 dark:border-y-slate-600 py-3 px-5">
            <!-- Category -->
              <div class="flex items-center gap-2">
                <svg class="size-5 theme-text-color">
                  <use href="#folder-open"></use>
                </svg>
                <a href="./blogs.html?category=${blog.category}" class="hover:theme-text-color transition-colors">${blog.categoryName}</a>
              </div>
              <!-- Writer -->
              <div class="flex items-center gap-2">
                <svg class="size-5 theme-text-color">
                  <use href="#pencil-square"></use>
                </svg>
                <span>${blog.writer}</span>
              </div>
              <!-- Reading Time -->
              <div class="flex items-center gap-2">
                <svg class="size-5 theme-text-color">
                  <use href="#timer"></use>
                </svg>
                <span>${blog.readingTime} دقیقه</span>
              </div>
              <!-- Date -->
              <div class="flex items-center gap-2">
                <svg class="size-5 theme-text-color">
                  <use href="#calendar-days"></use>
                </svg>
                <span>${blog.date}</span>
              </div>
              <!-- Seen -->
              <div class="flex items-center gap-2">
                <svg class="size-5 theme-text-color">
                  <use href="#eye"></use>
                </svg>
                <span>${blog.seen}</span>
              </div>
            </div>
            <!-- End of Detail -->
            <!-- Banner -->
            <div class="w-auto h-fit mx-auto px-5">
              <div class="rounded-2xl overflow-hidden">
                <img class="size-full" src="${blog.imageSrc}" alt="${blog.title}" />
              </div>
            </div>
            <!-- End of Banner -->
            <!--  Blog Content -->
            <article class="blog__content">${blog.content}</article>
            <!-- End of Blog Content -->
            <!-- Copy Link -->
              <div class="blog__copy-link-btn w-44 flex items-center gap-1 bg-slate-300 text-slate-900 py-1 px-2 rounded-xl md:cursor-pointer group" data-link="${location.origin}/blogs.html?blog=${blog.slug}">
                <svg class="size-6 md:cursor-pointer md:group-hover:theme-text-color transition-colors">
                  <use href="#clipboard-document"></use>
                </svg>
                <input class="w-32 text-xs sm:text-sm font-VazirLight outline-none bg-transparent cursor-pointer" dir="ltr" value="${location.origin}/blogs.html?blog=${blog.slug}" type="text" readonly />
              </div>
            <!-- End of Copy Link -->`;
  return template;
};

// dom-handlers.js
const recentBlogTemplate = (blog) => {
  const template = `
      <div class="p-4 bg-slate-100 dark:bg-slate-700 rounded-2xl mt-5">
        <a class="md:hover:theme-text-color transition-colors" href="./blog.html?blog=${blog.slug}">${blog.title}</a>
        <!-- Writer and Date -->
        <div class="flex items-center justify-end gap-4 font-VazirBold text-xs mt-4">
          <!-- Writer -->
          <div class="flex items-center gap-1">
            <svg class="size-4 theme-text-color">
              <use href="#pencil-square"></use>
            </svg>
            <span>${blog.writer}</span>
          </div>
          <!-- Date -->
          <div href="./blogs" class="flex items-center gap-1 font-VazirBold text-xs">
            <svg class="size-4 theme-text-color">
              <use href="#calendar-days"></use>
            </svg>
            <span>${blog.date}</span>
          </div>
        </div>
        <!-- End of Writer and Date -->
      </div>`;
  return template;
};

// auth.js
const authFormHeaderTemplate = (operation) => {
  let template = '';
  if (operation === 'signup') {
    template = `
            <h2 class="font-VazirBold text-center text-2xl">ثبت نام</h2>
            <div class="text-center mt-3">قبلا ثبت نام کرده اید؟ <a class="theme-text-color" href="./auth.html?operation=login">وارد شوید.</a></div>
            `;
  } else if (operation === 'login') {
    template = `
            <h2 class="font-VazirBold text-center text-2xl">ورود</h2>
            <div class="text-center mt-3">حساب کاربری ندارید؟ <a class="theme-text-color" href="./auth.html?operation=signup">ثبت نام کنید.</a></div>
            `;
  }
  return template;
};

// dom-handlers.js
const headerCartCourseTemplate = (course) => {
  let priceTemplate = null;
  let discountClass = '';
  if (course.discount === 100) {
    priceTemplate = `<span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>`;
  } else {
    priceTemplate = `
            <div class="flex items-end">
              <span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>
              <svg class="size-7 mr-[-3px]">
                <use href="#toman"></use>
              </svg>
            </div>`;
  }
  if (course.discount === 0) discountClass = 'hidden ';

  const template = `
    <!-- Cart Course -->
      <div class="flex items-center justify-between h-20 pb-4 border-b border-b-slate-200 dark:border-b-slate-700 relative">
      <!-- Cart Course Discount Percent -->
        <div class="${discountClass}absolute top-0 left-0 flex items-end justify-center px-1 h-5 theme-bg-color text-white text-sm rounded-tl-xl rounded-br-xl">${course.discount}٪</div>
        <div>
          <a href="./course.html?course=${course.slug}" class="font-VazirMedium transition-colors hover:theme-text-color line-clamp-1 text-sm">${course.name}</a>
          <div class="flex items-end gap-3 mt-3">
            <div class="cart__course-remove-btn size-6 flex items-center justify-center theme-bg-color-10 dark:bg-rose-600/10 text-rose-600 cursor-pointer rounded-full md:hover:scale-105 transition-all" data-course_id=${course.id}>
              <svg class="size-5">
                <use href="#trash"></use>
              </svg>
            </div>
            ${priceTemplate}
          </div>
        </div>
        <img src="${course.imageSrc}" class="w-20 h-full rounded-xl" alt="${course.name}" />
      </div>
    <!-- End of Cart Course -->`;
  return template;
};

// cart.js
const cartCourseTemplate = (course) => {
  let price = course.price.toLocaleString('fa-IR');
  let finalPriceTemplate = `
            <div class="flex items-end font-VazirMedium">
              <span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>
              <svg class="size-7 sm:size-8 lg:size-9 mr-[-3px]">
                <use href="#toman"></use>
              </svg>
            </div>`;
  let discountHiddenClass = ``;
  let priceHiddenClass = '';

  if (!course.timestamp) {
    discountHiddenClass = 'hidden ';
  }

  if (course.discount === 100) {
    finalPriceTemplate = `<span class="font-VazirMedium text-green-600 dark:text-green-400">${course.finalPrice}</span>`;
  } else if (course.discount === 0) {
    priceHiddenClass = `hidden `;
  }

  const template = `
    <!-- Course -->
    <div class="w-full space-y-4 p-5 bg-white dark:bg-slate-800 rounded-2xl shadow dark:shadow-none dark:border dark:border-slate-700">
      <!-- Image & Name and Caption -->
      <div class="flex items-center gap-3 lg:gap-6">
        <img class="w-20 h-16 sm:h-20 sm:w-32 lg:w-56 lg:h-auto rounded-xl" src="${course.imageSrc}" alt="${course.name}" />
        <!-- Name and Caption -->
        <div>
          <a class="font-VazirBold sm:text-lg md:hover:theme-text-color transition-all line-clamp-2 overflow-hidden" href="./course.html?course=${course.slug}">${course.name}</a>
          <p class="hidden lg:line-clamp-2 mt-4 font-VazirLight max-h-12">${course.caption}</p>
        </div>
        <!-- End of Name and Caption -->
      </div>
      <!-- End of Image & Name and Caption -->
      <!-- Discount and Price -->
      <div class="space-y-2 xs:space-y-0 xs:flex gap-8">
        <!-- Discount -->
        <div class="${discountHiddenClass}sm:text-lg theme-text-color shrink-0">
          <p class="font-VazirBold"><span>${course.discount}%</span> تخفیف ویژه</p>
          <div class="cart__discount-timer w-36" data-timestamp="${course.timestamp}">00 : 00 : 00 : 00</div>
        </div>
        <!-- End of Discount -->
        <!-- Remove Btn and Price -->
        <div class="flex justify-between items-center gap-2 flex-wrap w-full">
          <!-- Price -->
          <div class="flex items-end gap-2 text-lg sm:text-xl lg:text-2xl">
            <!-- Primary Price -->
            <span class="${priceHiddenClass}line-through dark:text-slate-300 text-slate-500 decoration-red-400">${price}</span>
            <!-- Final Price -->
              ${finalPriceTemplate}
            <!-- End of Final Price -->
          </div>
          <!-- End of Price -->
          <!-- Remove Btn -->
          <div class="cart__course-remove-btn size-6 flex items-center justify-center theme-bg-color-10 dark:bg-rose-600/10 text-rose-600 cursor-pointer rounded-full md:hover:scale-105 transition-all" data-course_id="${course.id}">
            <svg class="size-5">
              <use href="#trash"></use>
            </svg>
          </div>
          <!-- End of Remove Btn -->
        </div>
        <!-- End of Remove Btn and Price -->
      </div>
      <!-- End of Discount and Price -->
    </div>
    <!-- End of Course -->`;
  return template;
};

const accountCourseTemplate = (course) => {
  const template = `
      <!-- Course -->
      <div class="bg-white dark:bg-slate-800 shadow dark:shadow-none dark:border dark:border-slate-700 rounded-2xl pb-5">
        <!-- Course Banner -->
        <a class="block h-40 rounded-2xl overflow-hidden border-b border-b-slate-200 dark:border-b-slate-700" href="./course.html?course=${course.slug}">
          <img class="size-full object-cover" loading="lazy" src="${course.image_src}" alt="${course.name}" />
        </a>
        <!-- End of Course Banner -->
        <!-- Course Name -->
        <a class="block mt-4 px-4 font-VazirBold text-lg sm:h-14 hover:theme-text-color transition-all sm:line-clamp-2" href="./course.html?course=${course.slug}">${course.name}</a>
        <!-- End of Course Name -->
      </div>
      <!-- End of Course -->`;
  return template;
};

const accountQuestionTemplate = (question) => {
  let questionOverlay = `<div class="absolute inset-0 bg-amber-600/5"></div>`;
  let questionSituationTemplate = `<i class="text-amber-600">! در انتظار پاسخ</i>`;
  let questionBorderColor = 'border-amber-600';

  if (question.isClosed) {
    questionOverlay = `<div class="absolute inset-0 bg-rose-600/5"></div>`;
    questionSituationTemplate = `
    <div class="flex items-center gap-1 text-rose-600">
    <svg class="size-4">
    <use href="#x-mark"></use>
    </svg>
    <i class="text-sm">بسته شده</i>
    </div>`;
    questionBorderColor = 'border-rose-600';
  } else if (question.isAnswered) {
    questionOverlay = `<div class="absolute inset-0 bg-emerald-600/5"></div>`;
    questionSituationTemplate = `
        <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
          <svg class="size-4">
            <use href="#check"></use>
          </svg>
          <i class="text-sm">پاسخ داده شده</i>
        </div>`;
    questionBorderColor = 'border-emerald-600 dark:border-emerald-500';
  }

  const template = `
          <a href="./session.html?id=${question.sessionID}&course=${question.courseSlug}&question=${question.id}" class="flex flex-col md:flex-row md:justify-between gap-5 border-x-2 ${questionBorderColor} bg-white dark:bg-slate-800 rounded-2xl overflow-hidden p-3 shadow relative group">
            ${questionOverlay}
            <!-- Course Name and Session Name -->
            <div class="flex flex-wrap gap-3 text-sm sm:text-base md:group-hover:theme-text-color transition-colors z-10">
              <div class="flex gap-2">
                <svg class="size-5 shrink-0">
                  <use href="#course"></use>
                </svg>
                <span class="font-VazirMedium">${question.courseName}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="size-4 shrink-0">
                  <use href="#window"></use>
                </svg>
                <span>${question.sessionName}</span>
              </div>
            </div>
            <!-- End of Course Name and Session Name -->

            <!-- Situation and Date -->
            <div class="flex justify-between xs:justify-end flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base">
              <span>${formatTime(question.updatedAt)} - ${formatDate(question.updatedAt)}</span>
              <!-- Situation -->
                ${questionSituationTemplate}
              <!-- End of Situation -->
            </div>
            <!-- End of Situation and Date -->
          </a>`;

  return template;
};

const userAccountProfilePictureTemplate = (imageSrc) => {
  let template = `
          <div class="flex items-center justify-center size-full theme-bg-color-10">
            <svg class="size-20 theme-text-color">
              <use href="#user"></use>
            </svg>
          </div>`;

  if (imageSrc) {
    template = `<img class="size-full" src="${imageSrc}" alt="تصویر پروفایل">`;
  }
  return template;
};

const adminPanelCommentTemplate = (comment) => {
  const pageIcon = comment.page_type === 'course' ? 'course' : 'newspaper';
  const date = formatDate(comment.created_at);
  const commentDataParentID = comment.comment_id ? `data-comment_parent_id=${comment.comment_id}` : '';
  const message = comment.message.replace(/\n/g, '<br>');

  let confirmBtnColor = `bg-emerald-600/10`;
  let confirmBtnHoverColor = 'md:hover:bg-emerald-600 dark:hover:bg-emerald-500';
  let confirmBtnText = 'تایید';
  let confirmText = 'تایید نشده';
  let confirmIcon = 'x-mark';
  let confirmTextColor = 'text-amber-600';
  let confirmBorderColor = 'border-amber-600';
  if (comment.confirmed) {
    confirmBtnColor = `bg-amber-600/10`;
    confirmBtnHoverColor = 'md:hover:bg-amber-600';
    confirmBtnText = 'عدم تایید';
    confirmText = 'تایید شده';
    confirmIcon = 'check';
    confirmTextColor = 'text-emerald-600 dark:text-emerald-500';
    confirmBorderColor = 'border-emerald-600 dark:border-emerald-500';
  }
  const template = `
              <!-- Comment -->
            <div class="flex flex-col gap-2.5 justify-between bg-white dark:bg-slate-800 p-5 rounded-xl border-b-4 ${confirmBorderColor}">
              <!-- Course Name -->
              <div class="flex gap-2 text-sm sm:text-base md:hover:theme-text-color transition-colors font-VazirMedium pb-2.5 border-b border-b-slate-200 dark:border-b-slate-600">
                <svg class="size-5 shrink-0">
                  <use href="#${pageIcon}"></use>
                </svg>
                <a href="./${comment.page_type}.html?${comment.page_type}=${comment.page_slug}">${comment.page_name}</a>
              </div>
              <!-- Date And Writer -->
              <div class="flex items-center justify-between flex-wrap gap-x-4 gap-y-2 text-sm md:text-base">
                <!-- Writer -->
                <div class="flex gap-1">
                  <svg class="size-4">
                    <use href="#pencil-square"></use>
                  </svg>
                  <span>${comment.writer}</span>
                </div>
                <!-- Date -->
                <div class="flex gap-1">
                  <svg class="size-4">
                    <use href="#calendar-days"></use>
                  </svg>
                  <span>${date}</span>
                </div>
              </div>
              <!-- End of Date And Writer -->
              <!-- Message -->
              <p class="p-2 min-h-32 grow border bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl text-sm md:text-base">${message}</p>
              <!-- End of Message -->
              <!-- Confirm Text -->
              <div class="flex items-center gap-1 ${confirmTextColor}">
                <svg class="size-4">
                  <use href="#${confirmIcon}"></use>
                </svg>
                <span class="text-sm">${confirmText}</span>
              </div>
              <!-- End of Confirm Text -->
              <!-- Buttons -->
              <div class="comment__buttons flex justify-between md:gap-3 items-center" data-comment_id=${comment.id} ${commentDataParentID}>
                <!-- Confirm Btn -->
                <div class="comment__confirm-btn px-4 rounded-full ${confirmBtnColor} ${confirmBtnHoverColor} md:hover:text-white md:cursor-pointer select-none transition-colors">${confirmBtnText}</div>
                <!-- Delete Btn -->
                <svg class="size-6 md:size-5 comment__delete-btn text-rose-600 md:hover:scale-105 md:cursor-pointer transition-all">
                  <use href="#trash"></use>
                </svg>
              </div>
              <!-- End of Buttons -->
            </div>
            <!-- End of Comment -->`;
  return template;
};

const adminPanelQuestionTemplate = (question) => {
  let questionOverlay = `<div class="absolute inset-0 bg-amber-600/5"></div>`;
  let questionSituationTemplate = `<i class="text-amber-600">! در انتظار پاسخ</i>`;
  let questionBorderColor = 'border-amber-600';
  let viewBtnColors = 'bg-amber-600/10 text-amber-600 md:hover:bg-amber-600';

  if (question.isClosed) {
    questionOverlay = `<div class="absolute inset-0 bg-rose-600/5"></div>`;
    questionSituationTemplate = `
    <div class="flex items-center gap-1 text-rose-600">
    <svg class="size-4">
    <use href="#x-mark"></use>
    </svg>
    <i class="text-sm">بسته شده</i>
    </div>`;
    questionBorderColor = 'border-rose-600';
    viewBtnColors = 'bg-rose-600/10 text-rose-600 md:hover:bg-rose-600';
  } else if (question.isAnswered) {
    questionOverlay = `<div class="absolute inset-0 bg-emerald-600/5"></div>`;
    questionSituationTemplate = `
        <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
          <svg class="size-4">
            <use href="#check"></use>
          </svg>
          <i class="text-sm">پاسخ داده شده</i>
        </div>`;
    questionBorderColor = 'border-emerald-600 dark:border-emerald-500';
    viewBtnColors = 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-500 md:hover:bg-emerald-600 dark:md:hover:bg-emerald-500';
  }

  const template = `
          <div class="flex flex-col md:flex-row md:justify-between gap-5 border-x-2 ${questionBorderColor} bg-white dark:bg-slate-800 rounded-2xl overflow-hidden p-3 shadow relative">
            ${questionOverlay}
            <!-- Course Name -->
            <a href="./course.html?course=${question.courseSlug}" class="flex gap-2 text-sm sm:text-base md:hover:theme-text-color transition-colors font-VazirMedium z-10">
              <svg class="size-5 shrink-0">
                <use href="#course"></use>
              </svg>
              <span>${question.courseName}</span>
            </a>
            <!-- End of Course Name -->
            <!-- Situation, Date and View Btn -->
            <div class="flex justify-between xs:justify-end flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base">
              <span>${formatTime(question.updatedAt)} - ${formatDate(question.updatedAt)}</span>
              <!-- Situation -->
                ${questionSituationTemplate}
              <!-- End of Situation -->
              <!-- View Btn -->
              <div class="question__view-btn px-1 ${viewBtnColors} md:hover:text-white transition-colors rounded-md md:cursor-pointer select-none z-10" data-page_id="${question.pageID}" data-question_id="${question.id}">مشاهده</div>
              <!-- End of View Btn -->
            </div>
            <!-- End of Situation, Date and View Btn -->
          </div>`;

  return template;
};

const adminPanelViewedQuestionTemplate = (page, question, user) => {
  const template = `
  <div class="back-btn flex justify-end pb-5">
    <div class="theme-bg-color text-white rounded-full p-2 md:cursor-pointer">
      <svg class="size-6">
        <use href="#arrow-left"></use>
      </svg>
    </div>
  </div>
  <!-- Question Detail -->
  <div class="bg-white dark:bg-slate-800 space-y-3 py-3 px-2.5 rounded-2xl">
    <!-- Course Name -->
    <a href="course.html?course=${page.course_slug}" class="flex w-fit gap-2 text-sm sm:text-base md:hover:theme-text-color transition-colors">
      <svg class="size-5 shrink-0">
        <use href="#course"></use>
      </svg>
      <span>${page.course_name}</span>
    </a>
    <!-- End of Course Name -->
    <!-- Session Name -->
    <a href="session.html?id=${page.session_id}&course=${page.course_slug}" class="flex w-fit gap-2 text-sm sm:text-base md:hover:theme-text-color transition-colors">
      <svg class="size-5 shrink-0">
        <use href="#window"></use>
      </svg>
      <span>${page.session_name}</span>
    </a>
    <!-- End of Session Name -->
    <!-- Username -->
    <div class="flex w-fit gap-2 text-sm sm:text-base transition-colors">
      <svg class="size-5 shrink-0">
        <use href="#user"></use>
      </svg>
      <span>${user.username}</span>
    </div>
    <!-- End of Username -->
  </div>
  ${sessionQuestionTemplate(question, null, user.username)}
`;
  return template;
};

const sessionAnswersTemplate = (answers, sessionPage, username) => {
  if (!answers.length) return '';

  let template = '';

  answers.forEach((answer) => {
    const content = answer.content.replace(/\n/g, '<br>');
    const date = formatDate(answer.createdAt);
    const time = formatTime(answer.createdAt);

    if (answer.writerRole === 'teacher') {
      template += `
            <div class="xs:w-2/3 2xl:w-7/12 ${sessionPage ? 'xs:mr-auto theme-bg-color text-white' : 'theme-bg-color-10 dark:bg-sky-950'} mt-5 rounded-2xl pt-2 pb-4 px-4 relative z-20">
              <div class="flex items-start justify-between gap-2 border-b ${sessionPage ? 'border-b-slate-200' : 'border-b-slate-400'}">
                ${
                  sessionPage
                    ? `
                      <div>
                        <p class="sm:text-lg">${answer.writerName}</p>
                        <span>مدرس</span>
                      </div>`
                    : '<p class="sm:text-lg my-auto">شما</p>'
                }
                <div class="flex flex-col items-end">
                  <span>${date}</span>
                  <span>${time}</span>
                </div>
              </div>
              <!-- Answer Content -->
              <div class="w-full resize-none overflow-hidden mt-4 z-20">
                <p>${content}</p>
              </div>
            </div>`;
    } else {
      template += `
            <div class="xs:w-2/3 2xl:w-7/12 ${sessionPage ? 'theme-bg-color-10 dark:bg-sky-950' : 'xs:mr-auto theme-bg-color text-white'} mt-5 rounded-2xl pt-2 pb-4 px-4 relative z-20">
              <div class="flex items-start justify-between gap-2 border-b ${sessionPage ? 'border-b-slate-400' : 'border-b-slate-200'}">
                 ${
                   sessionPage
                     ? '<p class="sm:text-lg my-auto">شما</p>'
                     : `
                        <div>
                          <p class="sm:text-lg">${username}</p>
                          <span>کاربر</span>
                        </div>`
                 }
                <div class="flex flex-col items-end">
                  <span>${date}</span>
                  <span>${time}</span>
                </div>
              </div>
              <!-- Answer Content -->
              <div class="w-full resize-none overflow-hidden mt-4 z-20">
                <p>${content}</p>
              </div>
            </div>`;
    }
  });

  return template;
};

const sessionQuestionTemplate = (question, number = null, username = null) => {
  const content = question.content.replace(/\n/g, '<br>');
  const date = formatDate(question.createdAt);
  const time = formatTime(question.createdAt);

  let questionSituationText = 'در انتظار پاسخ';
  let questionSituationColor = 'bg-amber-600';

  if (question.isClosed) {
    questionSituationText = 'بسته شده';
    questionSituationColor = 'bg-rose-600';
  } else if (question.isAnswered) {
    questionSituationText = 'پاسخ داده شده';
    questionSituationColor = 'bg-emerald-600';
  }

  const template = `   
      <div class="py-5 my-5 ${number ? 'border-x theme-border-color bg-slate-100 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'} px-2.5 rounded-2xl" id="${question.id}">
        <div class="question-header flex items-center gap-4 text-sm sm:text-base w-fit theme-bg-color-10 rounded-full">
          ${number ? `<span class="pr-2">سوال ${number}</span>` : ''}
          <div class=" h-full ${number ? 'rounded-l-full' : 'rounded-full'} px-2 ${questionSituationColor}">
            <span class="text-white">${questionSituationText}</span>
          </div>
         </div>
         <!-- Question Content -->
         <div class="w-full text-white bg-slate-500 rounded-2xl px-4 pt-4 pb-1 resize-none overflow-hidden mt-4 relative z-20">
           <p>${content}</p>
           <!-- Question Footer -->
           <div class="flex items-end border-t border-t-slate-200 dark:border-slate-600 justify-between flex-wrap gap-2 mt-2 pt-1">
            <span>${time}</span>    
             <span>${date}</span>  
           </div>
           <!-- End of Question Footer -->
         </div>
         <!-- End of Question Content -->

         <!-- Answers -->
         <div class="px-2">
          ${sessionAnswersTemplate(question.answers, number, username)}
         </div>

         <!-- End of Answers -->
         
        ${
          question.isClosed
            ? '<div class="border border-rose-500 text-rose-500 text-center font-VazirMedium mt-6 rounded-xl p-4">این پرسش بسته شده است.</div>'
            : `
              <!-- New Answer Wrapper -->
                <div class="new-answer__wrapper mt-6">
                  <!-- Answer Btn -->
                  <div class="flex ${number ? 'justify-end' : 'justify-between'}">
                    ${
                      number
                        ? ''
                        : `
                          <div class="close-question-btn bg-rose-600 md:hover:bg-rose-700 text-white py-px px-1 flex items-center gap-1 select-none rounded-lg md:cursor-pointer transition-colors" data-question_id="${question.id}">
                            <svg class="size-5">
                              <use href="#lock-closed"></use>
                            </svg>
                            <span>بستن</span>
                          </div>
                        `
                    }
                    <div class="answer__open-btn bg-slate-300 py-px px-1 flex items-center gap-1 select-none rounded-lg text-slate-950 md:cursor-pointer md:hover:theme-text-color transition-colors" data-question_id="${question.id}">
                      <svg class="size-5">
                        <use href="#chat-bubble-left-ellipsis"></use>
                      </svg>
                      <span>پاسخ</span>
                    </div>
                  </div>
                  <!-- End of Answer Btn -->
                  <!-- New Answer -->
                  <div class="px-2 max-h-0 overflow-hidden" id="wrapper-${question.id}">
                    <textarea class="new-answer__textarea w-full h-40 bg-slate-200 dark:bg-slate-600 dark:placeholder:text-slate-300 placeholder:text-slate-500 rounded-2xl outline-none p-4 resize-none overflow-hidden" id="textarea-${question.id}" placeholder="پاسخ..."></textarea>
                    <div class="flex items-center justify-end gap-2 select-none" data-question_id="${question.id}">
                      <div class="new-answer__cancel-btn btn border theme-border-color md:hover:theme-bg-color-10 text-inherit md:cursor-pointer">لغو</div>
                      <div class="new-answer__submit-btn btn theme-bg-color border theme-border-color md:hover:theme-hover-bg-color md:cursor-pointer">ثبت</div>
                    </div>
                  </div>
                  <!-- End of New Answer -->
                </div> 
              <!-- End of New Answer Wrapper -->

                `
        }

       </div>`;

  return template;
};

export {
  loginBtnTemplate,
  courseCardTemplate,
  blogCardTemplate,
  courseInfoTemplate,
  courseDataTemplate,
  headlineTemplate,
  courseHeadlineSessionTemplate,
  commentTemplate,
  commentReplyTemplate,
  blogTemplate,
  recentBlogTemplate,
  authFormHeaderTemplate,
  headerCartCourseTemplate,
  cartCourseTemplate,
  accountCourseTemplate,
  accountQuestionTemplate,
  userAccountProfilePictureTemplate,
  adminPanelCommentTemplate,
  adminPanelQuestionTemplate,
  adminPanelViewedQuestionTemplate,
  sessionQuestionTemplate,
};
