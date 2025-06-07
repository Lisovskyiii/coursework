import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRouter } from '../../AppRouter';
import { AppHeader } from '../../modules/app-header';
import Spinner from '../../ui/spinner';

const App = (): JSX.Element => (
  <Router>
    <AppHeader />
    <div className="app">
      <main>
        <Suspense fallback={<Spinner />}>
          <AppRouter />
        </Suspense>
      </main>
    </div>
  </Router>
);

export default App;
