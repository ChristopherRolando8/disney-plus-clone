import { HeroContentTvProps } from "./hero-content-tv.type";
import styles from "./hero-content-tv.module.scss";
import Image from "next/image";
import { useScrollCoefficient } from "@/lib/hooks";
import clsx from "clsx";
import { RenderIf } from "../render-if";
import { Button, ButtonProps } from "../button";
import { Icon } from "@/constants/icon";
import { TMDB_IMG_URL } from "@/constants/api";
import dayjs from "dayjs";
import Link from "next/link";
import { generateUrlFromContent } from "@/lib/utils";

const HeroContentTv: React.FC<HeroContentTvProps> = (props) => {
  const {
    id,
    title,
    backdropUrl,
    language,
    overview,
    genres,
    airDate,
    onAddToWatchlist,
    onRemoveFromWatchlist,
    isInWatchlist,
    show = true,
    numberOfSeasons,
    loadingButton = false,
    enableHref = false,
    ...otherProps
  } = props;

  const { coefficient } = useScrollCoefficient();

  const handleAddToWatchlist: ButtonProps["onClick"] = (e) => {
    e?.preventDefault();
    if (onAddToWatchlist) onAddToWatchlist();
  };

  const handleRemoveFromWatchlist: ButtonProps["onClick"] = (e) => {
    e?.preventDefault();
    if (onRemoveFromWatchlist) onRemoveFromWatchlist();
  };

  const HeroContentTv = (
    <div
      className={clsx(styles.heroContentTvRoot, {
        [styles.heroTvShow]: show,
        [styles.heroTvHide]: !show,
      })}
      {...otherProps}
    >
      <Image
        priority={show}
        alt={`${title} backdrop`}
        fill
        style={{ opacity: 1 - coefficient }}
        src={`${TMDB_IMG_URL}/w1280${backdropUrl}`}
      />

      <div className={styles.content}>
        <div className={styles.tvDetailContent}>
          <p className="font-h1">{title}</p>

          <div className={styles.detailChipContainer}>
            <RenderIf isTrue={!!airDate}>
              <div className={styles.chipItem}>
                <p className={clsx("font-small", styles.chipText)}>
                  {dayjs(airDate).year()}
                </p>
              </div>

              <div className={styles.circleDivider} />
            </RenderIf>

            <RenderIf isTrue={!!numberOfSeasons}>
              <div className={styles.chipItem}>
                <p className={clsx("font-small", styles.chipText)}>
                  {numberOfSeasons} Season
                </p>
              </div>

              <div className={styles.circleDivider} />
            </RenderIf>

            <RenderIf isTrue={!!language}>
              <div className={styles.chipItem}>
                <p
                  className={clsx(
                    "font-small",
                    styles.chipText,
                    styles.language
                  )}
                >
                  {language}
                </p>
              </div>
            </RenderIf>
          </div>

          <p className={clsx("font-p", styles.overviewText)}>{overview}</p>

          <div className={styles.genreChipContainer}>
            {genres?.map((genre, idx) => {
              const isLast = idx === genres.length - 1;

              return (
                <>
                  <div className={styles.chipItem}>
                    <p className={clsx("font-small", styles.chipText)}>
                      {genre.name}
                    </p>
                  </div>

                  <RenderIf isTrue={!isLast}>
                    <div className={styles.lineDivider} />
                  </RenderIf>
                </>
              );
            })}
          </div>

          <div className={styles.buttonContainer}>
            <RenderIf isTrue={!isInWatchlist}>
              <Button
                loading={loadingButton}
                fullWidth
                className={styles.button}
                onClick={handleAddToWatchlist}
              >
                <div className={styles.logoContainer}>
                  <Image alt="Select" src={Icon.Add} />
                </div>

                <p className={clsx("font-p", styles.buttonText)}>
                  Add to Watchlist
                </p>
              </Button>
            </RenderIf>

            <RenderIf isTrue={isInWatchlist}>
              <Button
                fullWidth
                className={styles.button}
                onClick={handleRemoveFromWatchlist}
              >
                <div className={styles.logoContainer}>
                  <Image alt="Deselect" src={Icon.Remove} />
                </div>

                <p className={clsx("font-p", styles.buttonText)}>
                  Remove from Watchlist
                </p>
              </Button>
            </RenderIf>
          </div>
        </div>
      </div>

      <div className={styles.ornament} />
    </div>
  );

  if (!enableHref) return HeroContentTv;

  return (
    <Link
      aria-label={`View detail of ${title}`}
      as=""
      href={generateUrlFromContent({
        id: Number(id),
        mediaType: "tv",
        title,
      })}
    >
      {HeroContentTv}
    </Link>
  );
};

export default HeroContentTv;
