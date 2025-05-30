import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { BaseLayout } from './_layouts/BaseLayout';
import { PublicLayout } from './_layouts/PublicLayout';
import { UserLayout } from './_layouts/UserLayout';
import { AdventurePage } from './AdventurePage';
import { AdventuresListPage } from './AdventuresListPage';
import { BackgroundsPage } from './BackgroundsPage';
import { BestiaryPage } from './BestiaryPage';
import { ClassesPage } from './ClassesPage';
import { EditBeastPage } from './EditBeastPage';
import { EditMagicItemPage } from './EditMagicItemPage';
import { FeatsPage } from './FeatsPage';
import { HomePage } from './HomePage';
import { MagicItemsPage } from './MagicItemsPage';
import { MyBestiaryPage } from './MyBestiaryPage';
import { NewBeastPage } from './NewBeastPage';
import { NoAuthPage } from './NoAuthPage';
import { ProfilePage } from './ProfilePage';
import { SpeciesPage } from './SpeciesPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={BaseLayout}>
      <Route Component={PublicLayout}>
        <Route path={'/'} Component={HomePage} />

        <Route path={'/classes/:id?'} Component={ClassesPage} />
        <Route path={'/species/:id?'} Component={SpeciesPage} />
        <Route path={'/feats/:id?'} Component={FeatsPage} />
        <Route path={'/backgrounds/:id?'} Component={BackgroundsPage} />

        <Route path={'/bestiary/:id?'} Component={BestiaryPage} />
        <Route path={'/magic-items/:id?'} Component={MagicItemsPage} />

        <Route path={'/no-auth'} Component={NoAuthPage} />

        <Route Component={UserLayout}>
          <Route path="/beast/new" Component={NewBeastPage} />
          <Route path="/beast/:id" Component={EditBeastPage} />

          <Route path={'/magic-items/:id?/edit'} Component={EditMagicItemPage} />

          <Route path={'/my-bestiary/:id?'} Component={MyBestiaryPage} />
          <Route path={'/my-magic-items/:id?'} Component={MagicItemsPage} />

          <Route path={'/adventures'} Component={AdventuresListPage} />
          <Route path={'/adventures/:id'} Component={AdventurePage} />

          <Route path={'/profile'} Component={ProfilePage} />
        </Route>
      </Route>

      {/* not found */}
      <Route path={'*'} Component={() => <Navigate to={'/'} replace />} />
    </Route>
  )
);
