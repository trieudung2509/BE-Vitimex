<?php
global $post;
get_header();
$categories = get_queried_object();
$url_image = get_field('category_image', $categories);
?>


<?php
$paged = 1;    //hoặc 0
if (get_query_var('paged')) {
    $paged = get_query_var('paged');
} elseif (get_query_var('page')) {
    $paged = get_query_var('page');
}
$posts_per_page = get_option("posts_per_page");  //posts per page
$big = 999999999;
$query = new WP_Query(
    array(
        'post_type' => array('post'),
        'numberposts' => -1,
        'posts_per_page' => $posts_per_page,
        'paged' => $paged,
        'cat' => $categories->term_id
    )
);

?>

<?php
if (isset($url_image) && !empty($url_image)) :
?>
    <div class="wp-slider-home">
        <div class="slide-banner">
            <div class="item">
                <a href="javascript:void(0)">
                    <img src=<?php echo $url_image; ?> loading="lazy" alt="slide home 1-1" width="100%" height="auto" />
                </a>

            </div>
        </div>
    </div>
<?php
endif;
?>

<main id="main-site">
    <div class="container">
        <div class="row">
            <div class="col-md-4 products-counter filter-bg text-center">
                <ul itemprop="breadcrumb" xmlns:v="http://rdf.data-vocabulary.org/#" class="breadcrumb">
                    <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                        <a href=<?php echo get_home_url(); ?> itemprop="url"><span itemprop="title">Trang chủ</span></a>
                    </li>
                    <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                        <a href=<?php echo get_category_link($categories->term_id); ?> itemprop="url"><span itemprop="title"><?php echo isset($categories) && !empty($categories) ? $categories->name : '' ?></span></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="page-heading-news">
        <h1 class="page-heading-news-title text--caps"><?php echo isset($categories) && !empty($categories) ? $categories->name : '' ?></h1>
    </div>
    <div class="container">
        <div class="row">
            <?php
            if ($query->have_posts()) :
                while ($query->have_posts()) :
                    $query->the_post();
                    $url_image = wp_get_attachment_url(get_post_thumbnail_id(get_the_ID()), 'thumbnail');
            ?>

                    <article class="module-widget col-md-4 col-sm-6">
                        <div class="content-view">
                            <div class="article-thumb">
                                <figure>
                                    <a href=<?php echo get_permalink($post); ?> title=<?php the_title(); ?>>
                                        <img src=<?php echo $url_image; ?> loading="lazy" alt=<?php the_title(); ?>>
                                    </a>
                                </figure>
                            </div>
                            <div class="article-content">
                                <h3 class="text-2line"><a href=<?php echo get_permalink($post); ?> title=<?php the_title(); ?>><?php the_title(); ?></a></h3>
                                <p class="article-date"><?php echo date("d/m/Y", strtotime($post->post_date)); ?></p>
                                <p class="post-box__text text-3line"><?php echo $post->post_excerpt; ?></p>
                            </div>
                        </div>
                    </article>

            <?php
                endwhile;
            endif;
            ?>
            <?php glw_custom_pagination($query); ?>
        </div>
    </div>
</main>
<?php
get_footer();
?>