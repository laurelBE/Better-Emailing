import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PleaseReadPage } from '../pages/please-read/please-read';
import { InboxPage } from '../pages/inbox/inbox';
import { MaildetailPage } from '../pages/maildetail/maildetail';
import { ComposePage } from '../pages/compose/compose';
import { NetDemoPage } from '../pages/net-demo/net-demo';
import { MyJsonDataProvider } from '../providers/my-json-data/my-json-data';
import { HttpModule } from '@angular/http'; 
import { StartQuietTimePage } from '../pages/start-quiet-time/start-quiet-time';
import { ToolsPage } from '../pages/tools/tools';
import { ConversationActionPage } from '../pages/conversation-action/conversation-action';
import { MessageActionPage } from '../pages/message-action/message-action';
import { MessageDetailsPage } from '../pages/message-details/message-details';
import { NewEventPage } from '../pages/new-event/new-event';
import { ToDoPage } from '../pages/to-do/to-do';

import { FollowPage } from '../pages/follow/follow';
import { SidelinePage } from '../pages/sideline/sideline';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { CloseConversationPage } from '../pages/close-conversation/close-conversation';

import { NewEventAlertPage } from '../pages/new-event-alert/new-event-alert';
import { ReadRequestedPage } from '../pages/read-requested/read-requested';
import { ParticipationStatusPage } from '../pages/participation-status/participation-status';
import { TestPage } from '../pages/test/test';
import { SearchResultsPage } from '../pages/search-results/search-results';
import { SearchPage } from '../pages/search/search';
import { MenuMailPage } from '../pages/menu-mail/menu-mail';
import { PleaseReadDetailsPage } from '../pages/please-read-details/please-read-details';
import { MeetingRequestPage } from '../pages/meeting-request/meeting-request';
import { MettingRespondPage } from '../pages/metting-respond/metting-respond';
import { CalendarPage } from '../pages/calendar/calendar';
import { LoginPage } from '../pages/login/login';
import { DelegatePage } from '../pages/delegate/delegate';
import { RedirectPage } from '../pages/redirect/redirect';
import { SuggestAMeetingPage } from '../pages/suggest-a-meeting/suggest-a-meeting';
import { FilePage } from '../pages/file/file';
import { SchedulePage } from '../pages/schedule/schedule';
import { MyPreferencesPage } from '../pages/my-preferences/my-preferences';
import { SweepToSidelinePage } from '../pages/sweep-to-sideline/sweep-to-sideline';
import { FeedbackPage } from '../pages/feedback/feedback';
import { QuietimeListPage } from '../pages/quietime-list/quietime-list';
import { SenderChecklistPage } from '../pages/sender-checklist/sender-checklist';
import { ScheduleQuietTimePage } from '../pages/schedule-quiet-time/schedule-quiet-time';
import { ScheduleAlertPage } from '../pages/schedule-alert/schedule-alert';
import { ScheduleQuietTimePopupPage } from '../pages/schedule-quiet-time-popup/schedule-quiet-time-popup';
import { ChooseFolderPage } from '../pages/choose-folder/choose-folder';
import { FileDialogPage } from '../pages/file-dialog/file-dialog';
import { UrgentPage } from '../pages/urgent/urgent';
import { ImportantPage } from '../pages/important/important';
import { ActionRequestedPage } from '../pages/action-requested/action-requested';
import { FollowingPage } from '../pages/following/following';
import { ConversationListPage } from '../pages/conversation-list/conversation-list';
import { HighPriorityPage } from '../pages/high-priority/high-priority';
import { CalendarDemoPage } from '../pages/calendar-demo/calendar-demo';
import { TrashMailsPage } from '../pages/trash-mails/trash-mails';
import { TrashDetailsPage } from '../pages/trash-details/trash-details';
import { EditquiettimePage } from '../pages/editquiettime/editquiettime';
import { AddparticipantPage } from '../pages/addparticipant/addparticipant';
import { SummaryreportPage } from '../pages/Summaryreport/Summaryreport';
import { DemoiPage } from '../pages/demoi/demoi';
import { ReopenPage } from '../pages/reopen/reopen';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Calendar } from '@ionic-native/calendar';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { ShowimagePage } from '../pages/Showimage/Showimage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Keyboard } from '@ionic-native/keyboard';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
	PleaseReadPage,
  InboxPage,
  MaildetailPage,
  ComposePage,
  NetDemoPage,
  StartQuietTimePage,
  ToolsPage,
  ConversationActionPage,
  MessageActionPage,
  MessageDetailsPage,
  FollowPage,
  SidelinePage,
  WithdrawPage,
  CloseConversationPage,
  NewEventPage,
  NewEventAlertPage,
  TestPage,
  ReadRequestedPage,
  ParticipationStatusPage,
  SearchResultsPage,
  SearchPage,
  MenuMailPage,
  PleaseReadDetailsPage,
  MeetingRequestPage,
  MettingRespondPage,
  CalendarPage,
  LoginPage,
  DelegatePage,
  RedirectPage,
  SuggestAMeetingPage,
  FilePage,
  SchedulePage,
  MyPreferencesPage,
  SweepToSidelinePage,
  FeedbackPage,
  QuietimeListPage,
  SenderChecklistPage,
  ScheduleQuietTimePage,
  ScheduleAlertPage,
  ScheduleQuietTimePopupPage,
  ChooseFolderPage,
  FileDialogPage,
  UrgentPage,
  ImportantPage,
  ActionRequestedPage,
  FollowingPage,
  ConversationListPage,
  HighPriorityPage,
  CalendarDemoPage,
  ShowimagePage,
  TrashMailsPage,
  TrashDetailsPage,
  EditquiettimePage,
  ToDoPage,
  AddparticipantPage,
  DemoiPage,
  SummaryreportPage,
  ReopenPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	PleaseReadPage,
  InboxPage,
  MaildetailPage,
  ComposePage,
  NetDemoPage,
  StartQuietTimePage,
  ToolsPage,
  ConversationActionPage,
  MessageActionPage,
  MessageDetailsPage,
  FollowPage,
  SidelinePage,
  WithdrawPage,
  CloseConversationPage,
  NewEventPage,
  NewEventAlertPage,
  TestPage,
  ReadRequestedPage,
  ParticipationStatusPage,
  SearchResultsPage,
  SearchPage,
  MenuMailPage,
  PleaseReadDetailsPage,
  MeetingRequestPage,
  MettingRespondPage,
  CalendarPage,
  LoginPage,
  DelegatePage,
  RedirectPage,
  SuggestAMeetingPage,
  FilePage,
  SchedulePage,
  MyPreferencesPage,
  SweepToSidelinePage,
  FeedbackPage,
  QuietimeListPage,
  SenderChecklistPage,
  ScheduleQuietTimePage,
  ScheduleAlertPage,
  ScheduleQuietTimePopupPage,
  ChooseFolderPage,
  FileDialogPage,
  UrgentPage,
  ImportantPage,
  ActionRequestedPage,
  FollowingPage,
  ConversationListPage,
  HighPriorityPage,
  CalendarDemoPage,
  ShowimagePage,
  TrashMailsPage,
  TrashDetailsPage,
  EditquiettimePage,
  ToDoPage,
  AddparticipantPage,
  DemoiPage,
  SummaryreportPage,
  ReopenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
    GooglePlus,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyJsonDataProvider,
    ConnectivityServiceProvider,
    InAppBrowser,
    FileChooser,
    FileTransfer,
    Network,
    FilePath, 
    Keyboard,
    File
  ]
})
export class AppModule {}
