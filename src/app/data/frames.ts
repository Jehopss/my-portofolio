/**
 * Pictures from the projects themselves: screens from the Finwise recording,
 * plots from the Supreme Court notebook, and the visual assets in the Serenity,
 * NoFake and DeepPlan repositories. Each has a small `thumb` for the sheet and
 * a large `full` for the viewer. Generated from the source repos; see README.
 */
import type { StaticImageData } from "next/image";

import portrait from "../assets/profile.webp";

import fwDashboardThumb from "../assets/work/fw-dashboard-thumb.webp";
import fwDashboardFull from "../assets/work/fw-dashboard.webp";
import fwRecentThumb from "../assets/work/fw-recent-thumb.webp";
import fwRecentFull from "../assets/work/fw-recent.webp";
import fwCategoriesThumb from "../assets/work/fw-categories-thumb.webp";
import fwCategoriesFull from "../assets/work/fw-categories.webp";
import fwAddCategoryThumb from "../assets/work/fw-add-category-thumb.webp";
import fwAddCategoryFull from "../assets/work/fw-add-category.webp";
import fwColourThumb from "../assets/work/fw-colour-thumb.webp";
import fwColourFull from "../assets/work/fw-colour.webp";
import fwTransactionsThumb from "../assets/work/fw-transactions-thumb.webp";
import fwTransactionsFull from "../assets/work/fw-transactions.webp";
import fwAddTransactionThumb from "../assets/work/fw-add-transaction-thumb.webp";
import fwAddTransactionFull from "../assets/work/fw-add-transaction.webp";
import fwDateThumb from "../assets/work/fw-date-thumb.webp";
import fwDateFull from "../assets/work/fw-date.webp";
import fwBudgetsThumb from "../assets/work/fw-budgets-thumb.webp";
import fwBudgetsFull from "../assets/work/fw-budgets.webp";
import fwBudgetCardsThumb from "../assets/work/fw-budget-cards-thumb.webp";
import fwBudgetCardsFull from "../assets/work/fw-budget-cards.webp";
import fwEditBudgetThumb from "../assets/work/fw-edit-budget-thumb.webp";
import fwEditBudgetFull from "../assets/work/fw-edit-budget.webp";
import fwChartThumb from "../assets/work/fw-chart-thumb.webp";
import fwChartFull from "../assets/work/fw-chart.webp";
import scBalanceThumb from "../assets/work/sc-balance-thumb.webp";
import scBalanceFull from "../assets/work/sc-balance.webp";
import scWordsThumb from "../assets/work/sc-words-thumb.webp";
import scWordsFull from "../assets/work/sc-words.webp";
import scCloudRawThumb from "../assets/work/sc-cloud-raw-thumb.webp";
import scCloudRawFull from "../assets/work/sc-cloud-raw.webp";
import scLengthsThumb from "../assets/work/sc-lengths-thumb.webp";
import scLengthsFull from "../assets/work/sc-lengths.webp";
import scBoxplotThumb from "../assets/work/sc-boxplot-thumb.webp";
import scBoxplotFull from "../assets/work/sc-boxplot.webp";
import scIssuesThumb from "../assets/work/sc-issues-thumb.webp";
import scIssuesFull from "../assets/work/sc-issues.webp";
import scCloudThumb from "../assets/work/sc-cloud-thumb.webp";
import scCloudFull from "../assets/work/sc-cloud.webp";
import scVarianceTotalThumb from "../assets/work/sc-variance-total-thumb.webp";
import scVarianceTotalFull from "../assets/work/sc-variance-total.webp";
import scVarianceThumb from "../assets/work/sc-variance-thumb.webp";
import scVarianceFull from "../assets/work/sc-variance.webp";
import seLakeThumb from "../assets/work/se-lake-thumb.webp";
import seLakeFull from "../assets/work/se-lake.webp";
import seLandscapeThumb from "../assets/work/se-landscape-thumb.webp";
import seLandscapeFull from "../assets/work/se-landscape.webp";
import nfLogoThumb from "../assets/work/nf-logo-dark-thumb.webp";
import nfLogoFull from "../assets/work/nf-logo-dark.webp";
import dpIconThumb from "../assets/work/dp-icon-thumb.webp";
import dpIconFull from "../assets/work/dp-icon.webp";

export interface Frame {
  id: string;
  thumb: StaticImageData;
  full: StaticImageData;
  /** What the picture shows; also the viewer caption. */
  alt: string;
}

const frame = (id: string, thumb: StaticImageData, full: StaticImageData, alt: string): Frame => ({ id, thumb, full, alt });

export const frames = {
  portrait: frame("portrait", portrait, portrait, "Portrait of Jonathan Hopi Pranata"),
  fwDashboard: frame("fw-dashboard", fwDashboardThumb, fwDashboardFull, "Finwise dashboard: income, expense and net income totals above the income-versus-expense chart"),
  fwRecent: frame("fw-recent", fwRecentThumb, fwRecentFull, "Finwise dashboard scrolled down to the recent transactions list"),
  fwCategories: frame("fw-categories", fwCategoriesThumb, fwCategoriesFull, "Finwise categories page with six income and expense categories"),
  fwAddCategory: frame("fw-add-category", fwAddCategoryThumb, fwAddCategoryFull, "Finwise add-category dialog with name, type and colour fields"),
  fwColour: frame("fw-colour", fwColourThumb, fwColourFull, "Finwise add-category dialog with the colour picker open"),
  fwTransactions: frame("fw-transactions", fwTransactionsThumb, fwTransactionsFull, "Finwise transactions page with search, a type filter and the full list"),
  fwAddTransaction: frame("fw-add-transaction", fwAddTransactionThumb, fwAddTransactionFull, "Finwise add-transaction form with the category menu open"),
  fwDate: frame("fw-date", fwDateThumb, fwDateFull, "Finwise add-transaction form with the date picker open"),
  fwBudgets: frame("fw-budgets", fwBudgetsThumb, fwBudgetsFull, "Finwise budgets page with three monthly budgets, all over their limits"),
  fwBudgetCards: frame("fw-budget-cards", fwBudgetCardsThumb, fwBudgetCardsFull, "Finwise budget cards for transport, rent, and food and groceries"),
  fwEditBudget: frame("fw-edit-budget", fwEditBudgetThumb, fwEditBudgetFull, "Finwise edit-budget dialog"),
  fwChart: frame("fw-chart", fwChartThumb, fwChartFull, "Finwise income-versus-expense bar chart"),
  scBalance: frame("sc-balance", scBalanceThumb, scBalanceFull, "Bar chart of case outcomes: the first party won in nearly two of every three cases"),
  scWords: frame("sc-words", scWordsThumb, scWordsFull, "Bar chart of the most frequent words in the case facts, led by “court”"),
  scCloudRaw: frame("sc-cloud-raw", scCloudRawThumb, scCloudRawFull, "Word cloud of the raw case facts"),
  scLengths: frame("sc-lengths", scLengthsThumb, scLengthsFull, "Histogram of case-fact lengths, peaking around 1,000 characters"),
  scBoxplot: frame("sc-boxplot", scBoxplotThumb, scBoxplotFull, "Box plot of case-fact lengths, with outliers beyond 3,000 characters"),
  scIssues: frame("sc-issues", scIssuesThumb, scIssuesFull, "Bar chart of cases per issue area, led by criminal procedure"),
  scCloud: frame("sc-cloud", scCloudThumb, scCloudFull, "Word cloud of the case facts after preprocessing"),
  scVarianceTotal: frame("sc-variance-total", scVarianceTotalThumb, scVarianceTotalFull, "Cumulative explained variance across 25 TruncatedSVD components"),
  scVariance: frame("sc-variance", scVarianceThumb, scVarianceFull, "Explained variance of each TruncatedSVD component"),
  seLake: frame("se-lake", seLakeThumb, seLakeFull, "Serenity’s background illustration: clouds, pine-covered hills and a calm shore"),
  seLandscape: frame("se-landscape", seLandscapeThumb, seLandscapeFull, "Serenity’s full background illustration, from sky to shoreline"),
  nfLogo: frame("nf-logo-dark", nfLogoThumb, nfLogoFull, "The NoFake logo"),
  dpIcon: frame("dp-icon", dpIconThumb, dpIconFull, "DeepPlan’s app icon: the letters DP over a city skyline"),
};
