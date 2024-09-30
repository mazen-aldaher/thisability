import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Box,
  Skeleton,
  IconButton,
} from '@mui/material';


const ProductCardSkeleton = () => {
  return (
    <Box sx={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
      <Card sx={{ maxWidth: 364, borderRadius: '16px', boxShadow: 3 }}>
        {/* Skeleton for Product Image */}
        <Skeleton
          variant="rectangular"
          height={250}
          width={500}
          sx={{ borderRadius: '16px 16px 0 0' }}
        />

        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Skeleton for Category Label */}
            <Chip
              label={<Skeleton width={80} height={24} />}
              sx={{ minWidth: '10vh', height: '24px' }}
            />

            {/* Skeleton for Rating */}
            <Box display="flex" alignItems="center">
              <Skeleton width={24} height={24} variant="circular" />
              <Skeleton width={40} height={20} sx={{ marginLeft: 0.5 }} />
            </Box>
          </Grid>

          {/* Skeleton for Title and Description */}
          <Skeleton width="60%" height={30} sx={{ marginTop: 2 }} />
          <Skeleton width="100%" height={20} />
          <Skeleton width="80%" height={20} />

          {/* Skeleton for Product Price */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Skeleton width="40px" height={30} />
            <Skeleton width="50px" height={30} />
          </Box>
        </CardContent>

        {/* Divider (optional for skeleton) */}
        <Box sx={{ height: 1, backgroundColor: '#ddd', my: 2 }} />

        {/* Skeleton for Footer with Social Icons and Button */}
        <CardActions sx={{ padding: '16px' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="facebook" color="primary">
                  <Skeleton width={24} height={24} variant="circular" />
                </IconButton>
                <IconButton aria-label="whatsapp" color="success">
                  <Skeleton width={24} height={24} variant="circular" />
                </IconButton>
                <IconButton aria-label="instagram" color="secondary">
                  <Skeleton width={24} height={24} variant="circular" />
                </IconButton>
              </Box>
            </Grid>

            <Grid item>
              <Skeleton width={100} height={40} variant="rectangular" />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCardSkeleton;
