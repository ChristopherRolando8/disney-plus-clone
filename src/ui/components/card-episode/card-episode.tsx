import styles from "./card-episode.module.scss";
import { CardEpisodeProps } from "./card-episode.type";
import Image from "next/image";
import { TMDB_IMG_URL } from "@/constants/api";
import clsx from "clsx";
import dayjs from "dayjs";
import { RenderIf } from "../render-if";

const CardEpisode: React.FC<CardEpisodeProps> = (props) => {
  const {
    id,
    name,
    season,
    episode,
    duration,
    airDate,
    overview,
    posterUrl,
    loading,
    ...otherProps
  } = props;

  if (loading) return <div className={styles.cardEpisodeLoadingRoot} />;

  return (
    <div className={styles.cardEpisodeRoot} {...otherProps}>
      <div className={styles.imageContainer}>
        <Image
          sizes="(max-width 1540px) 220px"
          alt={`${name} Poster`}
          fill
          src={`${TMDB_IMG_URL}/w300${posterUrl}`}
        />

        <div
          className={styles.titlePlaceholder}
          data-testid={`episode-${id}${season}${episode}-title-placeholder`}
        >
          <p className={clsx("font-h3", styles.titlePlaceholderText)}>
            {`S${season} E${episode}`}
          </p>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <p className={clsx("font-p", styles.nameText)}>{name}</p>

        <div className={styles.detailChipContainer}>
          <div className={styles.chipItem}>
            <p
              className={clsx("font-small", styles.chipText)}
            >{`S${season} E${episode}`}</p>
          </div>

          <RenderIf isTrue={!!airDate}>
            <div className={styles.circleDivider} />

            <div className={styles.chipItem}>
              <p className={clsx("font-small", styles.chipText)}>
                {dayjs(airDate).format("D MMM YYYY")}
              </p>
            </div>
          </RenderIf>

          <RenderIf isTrue={!!duration}>
            <div className={styles.circleDivider} />

            <div className={styles.chipItem}>
              <p className={clsx("font-small", styles.chipText)}>{duration}m</p>
            </div>
          </RenderIf>
        </div>

        <p className={clsx("font-small", styles.overviewText)}>{overview}</p>
      </div>
    </div>
  );
};

export default CardEpisode;
