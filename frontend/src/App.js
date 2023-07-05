/** @format */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuthRedirect } from './components/redirect_user/redrict_user';
import { Login } from './pages/auth/login/login';
import { Registration } from './pages/auth/registration/registration';
import { OTPVerification } from './pages/auth/otp/otp';
import { UpdateUserDetails } from './pages/auth/update_details';
import { AdminDashboard } from './pages/dashboard/admin';
import { ClassesPage } from './pages/admin/class/classes';
import { ClassDetailsPage } from './pages/admin/class/class';
import { TeachersPage } from './pages/admin/teachers/teachers';
import { TeacherDashboard } from './pages/dashboard/teacher';
import { MarkAttendance } from './pages/teacher/attendace';

import { StudentDashboard } from './pages/dashboard/student';
import TeacherSubject from './pages/teacher/subject';

const App = () => {
  //after
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={useAuthRedirect}
          />
          <Route
            exact
            path='/login'
            component={Login}
          />
          <Route
            exact
            path='/register'
            component={Registration}
          />
          <Route
            exact
            path='/otp'
            component={OTPVerification}
          />
          <Route
            exact
            path='/update/user'
            component={UpdateUserDetails}
          />
          <Route
            exact
            path='/admin'
            component={AdminDashboard}
          />
          <Route
            exact
            path='/admin/classes'
            component={ClassesPage}
          />
          <Route
            exact
            path='/admin/class/:id'
            component={ClassDetailsPage}
          />
          <Route
            exact
            path='/admin/teachers'
            component={TeachersPage}
          />
          <Route
            exact
            path='/teacher'
            component={TeacherDashboard}
          />
          <Route
            exact
            path='/teacher/subject/:id'
            component={TeacherSubject}
          />
          <Route
            exact
            path='/teacher/attendance/:id'
            component={MarkAttendance}
          />

          <Route
            exact
            path='/student'
            component={StudentDashboard}
          />
        </Switch>
      </Router>
    </>
  );
};
export default App;
