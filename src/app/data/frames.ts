/**
 * Pictures from the projects themselves: plots from the Supreme Court
 * notebook and the NoFake logo. Each has a small `thumb` for the project row
 * and a large `full` for the gallery.
 */
import type { StaticImageData } from "next/image";

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
import nfLogoThumb from "../assets/work/nf-logo-dark-thumb.webp";
import nfLogoFull from "../assets/work/nf-logo-dark.webp";

export interface Frame {
  id: string;
  thumb: StaticImageData;
  full: StaticImageData;
  /** What the picture shows; also the viewer caption. */
  alt: string;
}

const frame = (id: string, thumb: StaticImageData, full: StaticImageData, alt: string): Frame => ({ id, thumb, full, alt });

export const frames = {
  scBalance: frame("sc-balance", scBalanceThumb, scBalanceFull, "Bar chart of case outcomes: the first party won in nearly two of every three cases"),
  scWords: frame("sc-words", scWordsThumb, scWordsFull, "Bar chart of the most frequent words in the case facts, led by “court”"),
  scCloudRaw: frame("sc-cloud-raw", scCloudRawThumb, scCloudRawFull, "Word cloud of the raw case facts"),
  scLengths: frame("sc-lengths", scLengthsThumb, scLengthsFull, "Histogram of case-fact lengths, peaking around 1,000 characters"),
  scBoxplot: frame("sc-boxplot", scBoxplotThumb, scBoxplotFull, "Box plot of case-fact lengths, with outliers beyond 3,000 characters"),
  scIssues: frame("sc-issues", scIssuesThumb, scIssuesFull, "Bar chart of cases per issue area, led by criminal procedure"),
  scCloud: frame("sc-cloud", scCloudThumb, scCloudFull, "Word cloud of the case facts after preprocessing"),
  scVarianceTotal: frame("sc-variance-total", scVarianceTotalThumb, scVarianceTotalFull, "Cumulative explained variance across 25 TruncatedSVD components"),
  scVariance: frame("sc-variance", scVarianceThumb, scVarianceFull, "Explained variance of each TruncatedSVD component"),
  nfLogo: frame("nf-logo-dark", nfLogoThumb, nfLogoFull, "The NoFake logo"),
};
