import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getAlbumById } from "src/api/deezer";
import { AlertMessage } from "src/components/Alert";
import { ContributorContainer } from "src/components/ContributorContainer";
import { HeaderAlbum } from "src/components/header/HeaderAlbum";
import { TracksContainer } from "src/components/TracksContainer";
import { SkeletonPageAlbum } from "src/components/skeleton/SkeletonPageAlbum";
import { AlbumDetail } from "src/model/Album";

export const AlbumPage = () => {
  let { id } = useParams();

  const [album, setAlbum] = useState<AlbumDetail | undefined>(undefined);
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true);

  useEffect(() => {
    getAlbumById(Number(id)).then((res) => {
      setAlbum(res.data as AlbumDetail);
      setIsLoadingAlbum(false);
    });
  }, [id]);

  const feats = album ? album.contributors : [];

  return (
    <Grid container>
      <Helmet>
        <title>
          {album
            ? `${album.artist.name} - ${album.title} - findMusic`
            : "findMusic"}
        </title>
      </Helmet>
      <Grid item xs={12}>
        {isLoadingAlbum ? (
          <SkeletonPageAlbum />
        ) : album ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <HeaderAlbum album={album} />
            </Grid>
            <Grid item xs={12}>
              <TracksContainer title="Songs" tracks={album.tracks.data} />
            </Grid>
            {feats.length > 0 && (
              <Grid item xs={12}>
                <ContributorContainer contributors={feats} />
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid item xs={12}>
            <AlertMessage />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
