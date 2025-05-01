import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { BaseLayout } from './_layouts/BaseLayout';
import { UserLayout } from './_layouts/UserLayout';
import { AdventuresPage } from './AdventuresPage';
import { BackgroundsPage } from './BackgroundsPage';
import { BeastPage } from './BeastPage';
import { BestiaryPage } from './BestiaryPage';
import { ClassesPage } from './ClassesPage';
import { FeatsPage } from './FeatsPage';
import { HomePage } from './HomePage';
import { MagicItemsPage } from './MagicItemsPage';
import { NewBeastPage } from './NewBeastPage';
import { ProfilePage } from './ProfilePage';
//import { NoAuthPage } from './NoAuthPage';
import { SpeciesPage } from './SpeciesPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={BaseLayout}>
      <Route Component={UserLayout}>
        <Route path={'/'} Component={HomePage} />

        <Route path={'/classes/:id?'} Component={ClassesPage} />
        <Route path={'/species/:id?'} Component={SpeciesPage} />
        <Route path={'/feats/:id?'} Component={FeatsPage} />
        <Route path={'/backgrounds/:id?'} Component={BackgroundsPage} />

        <Route path={'/bestiary/:id?'} Component={BestiaryPage} />

        <Route path={'/magic-items/:id?'} Component={MagicItemsPage} />

        <Route path="/beast/new" Component={NewBeastPage} />
        <Route path="/beast/:id" Component={BeastPage} />

        <Route path={'/adventures'} Component={AdventuresPage} />

        <Route path={'/profile'} Component={ProfilePage} />
        {/* <Route path={'/noauth'} Component={NoAuthPage} /> */}
      </Route>

      {/* not found */}
      <Route path={'*'} Component={() => <Navigate to={'/'} replace />} />
    </Route>
  )
);
