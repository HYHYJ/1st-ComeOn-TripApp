import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import RootLayout from './layout/RootLayout';

const MainPage = lazy(() => import('./pages/MainPage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const LocationDetailPage = lazy(() => import('./pages/LocationDetailPage'));
const AroundPage = lazy(() => import('./pages/AroundPage'));
const WishPage = lazy(() => import('./pages/WishPage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const MyBookingPage = lazy(() => import('./pages/MyBookingPage'));
const MyBookingDetailPage = lazy(() => import('./pages/MyBookingDetailPage'));
const MyReviewPage = lazy(() => import('./pages/MyReviewPage'));
const MyChatPage = lazy(() => import('./pages/MyChatPage'));
const MyQnaPage = lazy(() => import('./pages/MyQnaPage'));
const MyInfoPage = lazy(() => import('./pages/MyInfoPage'));
const MyWithdrawalPage = lazy(() => import('./pages/MyWithdrawalPage'));
const MyNewQnaPage = lazy(() => import('./pages/MyNewQnaPage'));
const MyQnaDetailPage = lazy(() => import('./pages/MyQnaDetailPage'));
const MyInfoChangePage = lazy(() => import('./pages/MyInfoChangePage'));
const HotelPage = lazy(() => import('./pages/HotelPage'));
const HotelDetailPage = lazy(() => import('./pages/HotelDetailPage'));
const HotelRoomDetailPage = lazy(() => import('./pages/HotelRoomDetailPage'));
const HotelEditPage = lazy(() => import('./pages/HotelEditPage'));
const AirlinePage = lazy(() => import('./pages/AirlinePage'));
const TrafficPage = lazy(() => import('./pages/TrafficPage'));
const TrafficTrainPage = lazy(() => import('./pages/TrafficTrainPage'));
const TrafficCarPage = lazy(() => import('./pages/TrafficCarPage'));
const TrafficCarDetailPage = lazy(() => import('./pages/TrafficCarDetailPage'));
const AppInstallPage = lazy(() => import('./pages/AppInstallPage'));
const LeisurePage = lazy(() => import('./pages/LeisurePage'));
const LeisureThemePage = lazy(() => import('./pages/LeisureThemePage'));
const LeisureBrandPage = lazy(() => import('./pages/LeisureBrandPage'));
const LeisureListPage = lazy(() => import('./pages/LeisureListPage'));
const LeisureDetailPage = lazy(() => import('./pages/LeisureDetailPage'));
const ExhibitionDetailPage = lazy(() => import('./pages/ExhibitionDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const SearchDetailPage = lazy(() => import('./pages/SearchDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const HotelBookingPage = lazy(() => import('./pages/HotelBookingPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const FindPage = lazy(() => import('./pages/FindPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'location', element: <LocationPage /> },
      { path: 'location/:category', element: <LocationDetailPage /> },
      { path: 'location/:category/hotel/:id', element: <HotelDetailPage /> },
      { path: 'around', element: <AroundPage /> },
      { path: 'around/hotel/:id', element: <HotelDetailPage /> },
      { path: 'around/LeisureDetail/:id', element: <LeisureDetailPage /> },
      { path: 'around/:latitude/:longitude', element: <AroundPage /> },
      { path: 'around/:latitude/:longitude/hotel/:id', element: <HotelDetailPage /> },
      { path: 'around/:latitude/:longitude/LeisureDetail/:id', element: <LeisureDetailPage /> },
      { path: 'wish', element: <WishPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'mypage/mybooking', element: <MyBookingPage /> },
      { path: 'MyBookingDetailPage/:date', element: <MyBookingDetailPage /> },
      { path: 'mypage/myreview', element: <MyReviewPage /> },
      { path: 'mypage/mychatroom', element: <MyChatPage /> },
      { path: 'mypage/myinfo', element: <MyInfoPage /> },
      { path: 'mypage/myqna', element: <MyQnaPage /> },
      { path: 'mypage/myqna/mynewqna', element: <MyNewQnaPage /> },
      { path: 'MyQnaDetailPage/:id', element: <MyQnaDetailPage /> },
      { path: 'mypage/myinfo/myinfochange', element: <MyInfoChangePage /> },
      { path: 'mypage/mywithdrawal', element: <MyWithdrawalPage /> },
      { path: 'hotel', element: <HotelPage /> },
      { path: 'hotel/:id', element: <HotelDetailPage /> },
      { path: 'hotel/edit/:id', element: <HotelEditPage /> },
      { path: 'rooms/:id/:hotel/:title', element: <HotelRoomDetailPage /> },
      { path: 'airline', element: <AirlinePage /> },
      { path: 'traffic', element: <TrafficPage /> },
      { path: 'train', element: <TrafficTrainPage /> },
      { path: 'car', element: <TrafficCarPage /> },
      { path: 'carDetail/:id', element: <TrafficCarDetailPage /> },
      { path: 'install', element: <AppInstallPage /> },
      { path: 'leisure', element: <LeisurePage /> },
      { path: 'leisure/:id', element: <LeisureThemePage /> },
      { path: 'leisurebrand/:id', element: <LeisureBrandPage /> },
      { path: 'LeisureListPage', element: <LeisureListPage /> },
      { path: 'LeisureDetail/:id', element: <LeisureDetailPage /> },
      { path: 'ExhibitionDetail/:id', element: <ExhibitionDetailPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'search/:category', element: <SearchDetailPage /> },
      { path: 'search/location/:category', element: <LocationDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'booking/:id/:hotel/:title/:checkin/:checkout', element: <HotelBookingPage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'find', element: <FindPage /> },
    ],
  },
]);

export default router;
