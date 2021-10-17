<?php
global $post;
get_header();
$categories = get_the_category();
$all_categories = get_categories(array(
    'taxonomy'   => 'category', // Taxonomy to retrieve terms for. We want 'category'. Note that this parameter is default to 'category', so you can omit it
    'parent'     => 0,
    'hide_empty' => 0,
));
$args2 = array(
    'post_type' =>  'post',
    'post_status' => 'publish',
    'orderby' => 'post_date',
    'order' => 'DESC',
    'posts_per_page' => 3,
    'cat' => $categories[0]->term_id,
    'post__not_in' => array($post->ID)
);
$sidebar = new WP_Query($args2);
?>

<main id="main-site">
    <section class="main-news-cate mr-top">
        <div class="top-menu-cate">
            <ul>
                <?php
                if (count($all_categories) > 0) :
                    foreach ($all_categories as $cate) :
                ?>
                        <li><a href=<?php echo get_category_link($cate->term_id); ?>><?php echo $cate->name; ?></a></li>
                <?php
                    endforeach;
                endif; ?>
            </ul>
        </div>
        <div class="container">
            <!-- <div class="product-nav border-none">
                <a href="he-sang-khuyen-mai-ngap-tran-giam-30-toan-bo-phu-kien-thoi-trang-nam-cao-cap.html" class="item--prev">
                    <i class="fa fa-angle-left"></i>
                    <span>Trước</span>
                </a>
                <a href="mua-do-cho-cha-tang-do-cho-con.html" class="item--next">
                    <span>Tiếp theo</span>
                    <i class="fa fa-angle-right"></i>
                </a>
            </div> -->
            <div class="ars-row">
                <div class="post-heading">
                    <div class="products-counter filter-bg text-center" style="margin: 0 0 20px 0">
                        <ul itemprop="breadcrumb" xmlns:v="http://rdf.data-vocabulary.org/#" class="breadcrumb">
                            <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                                <a href=<?php echo get_home_url(); ?> itemprop="url"><span itemprop="title">Trang chủ</span></a>
                            </li>
                            <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                                <a href=<?php echo get_category_link($categories[0]->term_id); ?> itemprop="url"><span itemprop="title"><?php echo isset($categories) && !empty($categories) ? $categories[0]->name : '' ?></span></a>
                            </li>
                            <li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
                                <a href=<?php echo get_permalink($post); ?> itemprop="url"><span itemprop="title"><?php echo $post->post_title; ?></span></a>
                            </li>
                        </ul>
                    </div>
                    <span class="post-heading__cat"><?php echo isset($categories) && !empty($categories) ? $categories[0]->name : '' ?></span>
                    <h1 class="post-heading__title h1-serif"><?php echo $post->post_title; ?></h1>
                    <span class="post-heading__date"><?php echo date("d/m/Y", strtotime($post->post_date)); ?></span>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="ars-row">
                <div class="post-excerpt">
                    <p> <?php echo $post->post_excerpt; ?> </p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="ars-row">
                <div class="post-excerpt">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="ars-row">
                <div class="social-footer social-share">
                    <a href="mailto:online@kgvietnam.com" title="Share Email" target="_blank" rel="nofollow"><i class="fa fa-envelope"></i></a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo get_permalink($post); ?>" title="Share Facebook" target="_blank" rel="nofollow"><i class="fa fa-facebook-square"></i></a>
                    <a href="https://twitter.com/home?status=<?php echo get_permalink($post); ?>" title="Share Twitter" target="_blank" rel="nofollow"><i class="fa fa-twitter"></i></a>
                    <!-- <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://aristino.com/showroom-5-xanh-mua-sam-an-lanh.html&amp;title=SHOWROOM 5 XANH, MUA SẮM AN LÀNH&amp;summary=Để đem đến trải nghiệm mua sắm an toàn và tiện lợi nhất cho khách hàng, Aristino đã chính thức cập nhật quy trình mua hàng tại hệ thống Showroom Aristino theo tiêu chuẩn 5 XANH đặc biệt:&amp;source=" title="Share Linked In" target="_blank" rel="nofollow"><i class="fa fa-linkedin"></i></a> -->
                    <!-- <a href="https://pinterest.com/pin/create/button/?url=https://aristino.com/showroom-5-xanh-mua-sam-an-lanh.html&amp;media=&amp;description=SHOWROOM 5 XANH, MUA SẮM AN LÀNH" title="Share Pinterest" target="_blank" rel="nofollow"><i class="fa fa-pinterest "></i></a> -->
                </div>
            </div>
        </div>
        <!-- <div class="container">
            <div class="product-nav border-top">
                <a href="he-sang-khuyen-mai-ngap-tran-giam-30-toan-bo-phu-kien-thoi-trang-nam-cao-cap.html" class="item--prev">
                    <i class="fa fa-angle-left"></i>
                    <span>Trước</span>
                </a>
                <a href="mua-do-cho-cha-tang-do-cho-con.html" class="item--next">
                    <span>Tiếp theo</span>
                    <i class="fa fa-angle-right"></i>
                </a>
            </div>
        </div> -->
        <div class="featured-posts">
            <div class="container">
                <div class="featured-posts-title">
                    <h2>Các bài viết khác</h2>
                </div>
                <div class="row">
                    <?php
                    if ($sidebar->have_posts()) :
                        while ($sidebar->have_posts()) :
                            $sidebar->the_post();
                            $url_image = wp_get_attachment_url(get_post_thumbnail_id(get_the_ID()), 'thumbnail');
                    ?>
                            <article class="module-widget col-md-4 col-sm-6">
                                <div class="content-view">
                                    <div class="article-thumb">
                                        <figure>
                                            <a href="<?php echo get_permalink($post); ?>" title=<?php the_title(); ?>>
                                                <img src=<?php echo $url_image; ?> loading="lazy" alt=<?php the_title(); ?>>
                                            </a>
                                        </figure>
                                    </div>
                                    <div class="article-content">
                                        <h3 class="text-2line inverse"><a href=<?php echo get_permalink($post); ?> title=<?php the_title(); ?>><?php the_title(); ?></a></h3>
                                        <p class="article-date"><?php echo date("d/m/Y", strtotime($post->post_date)); ?></p>
                                    </div>
                                </div>
                            </article>
                    <?php
                        endwhile;
                    endif;
                    ?>
                </div>
            </div>
        </div>
    </section>
</main>


<?php
get_footer();
?>