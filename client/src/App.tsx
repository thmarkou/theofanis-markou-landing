/*
Design Philosophy: Swiss Editorial Command
The application shell must default to dark mode so all semantic tokens resolve to
charcoal surfaces, silver text, and restrained electric-blue accents.
*/

import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { GoogleAnalyticsTracker } from "@/components/GoogleAnalyticsTracker";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppPrivacy from "./pages/AppPrivacy";
import AppProduct from "./pages/AppProduct";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <GoogleAnalyticsTracker />
      <Switch>
        <Route path="/de/privacy" component={Privacy} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/de/:slug/privacy" component={AppPrivacy} />
        <Route path="/:slug/privacy" component={AppPrivacy} />
        <Route path="/de/:slug" component={AppProduct} />
        <Route path="/:slug" component={AppProduct} />
        <Route path="/de" component={Home} />
        <Route path="/" component={Home} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <CookieConsentProvider>
            <Router />
            <CookieConsentBanner />
          </CookieConsentProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
