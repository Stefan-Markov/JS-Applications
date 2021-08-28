import page from '../../node_modules/page/page.mjs';

import { homePage } from './views/homeView.js';
import { loginPage } from './views/loginView.js';
import { moviePage } from './views/movieView.js';
import { renderMiddleware } from './middlewares/renderMiddleware.js';
import { movieDetailsPage } from './views/movieDetailsView.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

page(authMiddleware)
page(renderMiddleware);

page('/', homePage);
page('/login', loginPage)
page('/movies', moviePage);
page('/movies/:movieId', movieDetailsPage)

page.start();
