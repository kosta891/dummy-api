import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage.js';
import ErrorPage from './pages/ErrorPage.js';
import CreatePage from './pages/CreatePage.js';
import DetailPage from './pages/DetailPage.js';
import EditPostPage from './pages/EditPostPage.js';
import TagPage from './pages/TagPage.js';
import Layout from './components/UI/Layout.js';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Route path='/create' exact>
          <CreatePage />
        </Route>

        <Route path='/:id' exact>
          <DetailPage />
        </Route>
        <Route path='/:id/edit' exact>
          <EditPostPage />
        </Route>

        <Route path='/tag/:id/post' exact>
          <TagPage />
        </Route>
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
