import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { BaseLayout } from './_layouts/BaseLayout';
import { BackgroundsPage } from './BackgroundsPage';
import { BestiaryPage } from './BestiaryPage';
import { ClassesPage } from './ClassesPage';
import { FeatsPage } from './FeatsPage';
import { HomePage } from './HomePage';
import { SpeciesPage } from './SpeciesPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={BaseLayout}>
      <Route path={'/'} Component={HomePage} />

      <Route path={'/classes/:id?'} Component={ClassesPage} />
      <Route path={'/species/:id?'} Component={SpeciesPage} />
      <Route path={'/feats/:id?'} Component={FeatsPage} />
      <Route path={'/backgrounds/:id?'} Component={BackgroundsPage} />

      <Route path={'/bestiary'} Component={BestiaryPage} />

      {/* not found */}
      <Route path={'*'} Component={() => <Navigate to={'/'} replace />} />
    </Route>
  )
);
