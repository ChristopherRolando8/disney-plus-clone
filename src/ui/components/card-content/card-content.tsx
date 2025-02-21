import styles from "./card-content.module.scss";
import { CardContentProps } from "./card-content.type";
import { useState } from "react";
import { TMDB_IMG_URL } from "@/constants/api";
import Image from "next/image";
import clsx from "clsx";
import { useDebounce } from "@/lib/hooks";
import { Button } from "../button";
import { RenderIf } from "../render-if";
import Link from "next/link";
import { ButtonProps } from "../button/button.type";
import { Icon } from "@/constants/icon";
import { generateUrlFromContent } from "@/lib/utils";

const CardContent: React.FC<CardContentProps> = (props) => {
  const {
    id,
    title,
    overview,
    posterUrl,
    backdropUrl,
    mediaType,
    isInWatchlist = false,
    buttonLoading = false,
    loading = false,
    onAddToWatchlistClick,
    onRemoveFromWatchlistClick,
    selected = false,
    mode = "default",
    onSelect,
    ...otherProps
  } = props;

  const [expand, setIsExpand] = useState(false);
  const debouncedExpand = useDebounce(expand, 600);

  const onMouseOver = () => {
    if (mode === "select") return;
    setIsExpand(true);
  };

  const onMouseOut = () => {
    if (mode === "select") return;
    setIsExpand(false);
  };

  const handleAddToWatchlist: ButtonProps["onClick"] = (e) => {
    e?.preventDefault();
    if (onAddToWatchlistClick) onAddToWatchlistClick();
  };

  const handleRemoveFromWatchlist: ButtonProps["onClick"] = (e) => {
    e?.preventDefault();
    if (onRemoveFromWatchlistClick) onRemoveFromWatchlistClick();
  };

  const handleSelect = () => {
    if (!onSelect) return;

    if (selected) return onSelect("remove");
    return onSelect("add");
  };

  if (loading)
    return (
      <div className={styles.cardContentRoot}>
        <div className={styles.noExpandLoading} />
      </div>
    );

  const CardContent = (
    <div
      className={styles.cardContentRoot}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      {...otherProps}
    >
      <>
        <div
          className={clsx(styles.noExpand, {
            [styles.noExpandHide]: expand,
            [styles.noExpandShow]: !expand,
            [styles.selected]: selected,
            [styles.notSelected]: !selected,
            [styles.animate]: mode === "select",
          })}
          data-testid={`${mediaType}-${id}-base-card`}
        >
          <div className={styles.imageContainerNoExpand}>
            <Image
              sizes="(max-width 1540px) 232px (max-width 1240px) 180px"
              alt={`${title} Poster`}
              fill
              src={`${TMDB_IMG_URL}/w342${posterUrl}`}
            />

            <div
              className={styles.titlePlaceholder}
              data-testid={`movie-${id}-title-placeholder`}
            >
              <p className={clsx("font-h3", styles.titlePlaceholderText)}>
                {title}
              </p>
            </div>
          </div>
        </div>

        <div
          className={clsx(styles.expand, {
            [styles.expandShow]: debouncedExpand,
            [styles.expandHide]: !debouncedExpand,
          })}
          data-testid={`${mediaType}-${id}-popup-card`}
        >
          <div className={styles.imageContainer}>
            <Image
              sizes="(max-width 1540px) 336px"
              alt={`${title} backdrop`}
              fill
              src={`${TMDB_IMG_URL}/w300${backdropUrl}`}
            />

            <div className={styles.ornament} />
          </div>

          <div className={styles.contentContainer}>
            <p className={clsx("font-h5", styles.title)}>{title}</p>
            <p className={clsx("font-small", styles.overviewText)}>
              <RenderIf isTrue={!!overview}>{overview}</RenderIf>

              <RenderIf isTrue={!overview}>
                This content does not have overview.
              </RenderIf>
            </p>

            <RenderIf isTrue={!isInWatchlist}>
              <Button
                className={styles.button}
                fullWidth
                onClick={handleAddToWatchlist}
                loading={buttonLoading}
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
                className={styles.button}
                fullWidth
                onClick={handleRemoveFromWatchlist}
                loading={buttonLoading}
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
      </>
    </div>
  );

  if (mode === "default") {
    return (
      <Link
        as=""
        href={generateUrlFromContent({ id, mediaType, title })}
        passHref
      >
        {CardContent}
      </Link>
    );
  }

  return <div onClick={handleSelect}>{CardContent}</div>;
};

export default CardContent;
