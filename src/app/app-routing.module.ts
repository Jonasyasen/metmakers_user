/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/


import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-new-card',
    loadChildren: () => import('./pages/add-new-card/add-new-card.module').then(m => m.AddNewCardPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'bookmark',
    loadChildren: () => import('./pages/bookmark/bookmark.module').then(m => m.BookmarkPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsPageModule)
  },
  {
    path: 'country-code-picker',
    loadChildren: () => import('./pages/country-code-picker/country-code-picker.module').then(m => m.CountryCodePickerPageModule)
  },
  {
    path: 'course-details',
    loadChildren: () => import('./pages/course-details/course-details.module').then(m => m.CourseDetailsPageModule)
  },
  {
    path: 'create-pin',
    loadChildren: () => import('./pages/create-pin/create-pin.module').then(m => m.CreatePinPageModule)
  },
  {
    path: 'curriculcum',
    loadChildren: () => import('./pages/curriculcum/curriculcum.module').then(m => m.CurriculcumPageModule)
  },
  {
    path: 'e-receipt',
    loadChildren: () => import('./pages/e-receipt/e-receipt.module').then(m => m.EReceiptPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'fill-profile',
    loadChildren: () => import('./pages/fill-profile/fill-profile.module').then(m => m.FillProfilePageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/filter/filter.module').then(m => m.FilterPageModule)
  },
  {
    path: 'finger-print',
    loadChildren: () => import('./pages/finger-print/finger-print.module').then(m => m.FingerPrintPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxPageModule)
  },
  {
    path: 'invite-friends',
    loadChildren: () => import('./pages/invite-friends/invite-friends.module').then(m => m.InviteFriendsPageModule)
  },
  {
    path: 'languages',
    loadChildren: () => import('./pages/languages/languages.module').then(m => m.LanguagesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'mentor-details',
    loadChildren: () => import('./pages/mentor-details/mentor-details.module').then(m => m.MentorDetailsPageModule)
  },
  {
    path: 'my-courses',
    loadChildren: () => import('./pages/my-courses/my-courses.module').then(m => m.MyCoursesPageModule)
  },
  {
    path: 'my-courses-details',
    loadChildren: () => import('./pages/my-courses-details/my-courses-details.module').then(m => m.MyCoursesDetailsPageModule)
  },
  {
    path: 'notification-settings',
    loadChildren: () => import('./pages/notification-settings/notification-settings.module').then(m => m.NotificationSettingsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'online-courses',
    loadChildren: () => import('./pages/online-courses/online-courses.module').then(m => m.OnlineCoursesPageModule)
  },
  {
    path: 'payment-methods',
    loadChildren: () => import('./pages/payment-methods/payment-methods.module').then(m => m.PaymentMethodsPageModule)
  },
  {
    path: 'payment-options',
    loadChildren: () => import('./pages/payment-options/payment-options.module').then(m => m.PaymentOptionsPageModule)
  },
  {
    path: 'payment-success-modal',
    loadChildren: () => import('./pages/payment-success-modal/payment-success-modal.module').then(m => m.PaymentSuccessModalPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'remove-bookmark-modal',
    loadChildren: () => import('./pages/remove-bookmark-modal/remove-bookmark-modal.module').then(m => m.RemoveBookmarkModalPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then(m => m.ReviewsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./pages/security/security.module').then(m => m.SecurityPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./pages/success/success.module').then(m => m.SuccessPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsPageModule)
  },
  {
    path: 'top-courses',
    loadChildren: () => import('./pages/top-courses/top-courses.module').then(m => m.TopCoursesPageModule)
  },
  {
    path: 'top-mentors',
    loadChildren: () => import('./pages/top-mentors/top-mentors.module').then(m => m.TopMentorsPageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./pages/transaction/transaction.module').then(m => m.TransactionPageModule)
  },
  {
    path: 'video-call',
    loadChildren: () => import('./pages/video-call/video-call.module').then(m => m.VideoCallPageModule)
  },
  {
    path: 'video-player',
    loadChildren: () => import('./pages/video-player/video-player.module').then(m => m.VideoPlayerPageModule)
  },
  {
    path: 'view-certificate',
    loadChildren: () => import('./pages/view-certificate/view-certificate.module').then(m => m.ViewCertificatePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'write-reviews',
    loadChildren: () => import('./pages/write-reviews/write-reviews.module').then(m => m.WriteReviewsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
