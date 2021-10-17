<?php

/**
 * Twenty Seventeen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since Twenty Seventeen 1.0
 */
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function publicinsight_theme_support()
{
	/*
	 * Make theme available for translation.
	 * Translations can be filed at WordPress.org. See: https://translate.wordpress.org/projects/wp-themes/twentyseventeen
	 * If you're building a theme based on Twenty Seventeen, use a find and replace
	 * to change 'twentyseventeen' to the name of your theme in all the template files.
	 */
	load_theme_textdomain('twentyseventeen');

	// Add default posts and comments RSS feed links to head.
	add_theme_support('automatic-feed-links');

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support('title-tag');

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support('post-thumbnails');

	add_image_size('twentyseventeen-featured-image', 2000, 1200, true);

	add_image_size('twentyseventeen-thumbnail-avatar', 100, 100, true);

	// Set the default content width.
	$GLOBALS['content_width'] = 525;

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus(
		array(
			'top'    => __('Top Menu', 'twentyseventeen'),
			'social' => __('Social Links Menu', 'twentyseventeen'),
		)
	);

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
		)
	);

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://wordpress.org/support/article/post-formats/
	 */
	add_theme_support(
		'post-formats',
		array(
			'aside',
			'image',
			'video',
			'quote',
			'link',
			'gallery',
			'audio',
		)
	);

	// Add theme support for Custom Logo.
	add_theme_support(
		'custom-logo',
		array(
			'width'      => 250,
			'height'     => 250,
			'flex-width' => true,
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support('customize-selective-refresh-widgets');

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
	  */

	// Load regular editor styles into the new block-based editor.
	add_theme_support('editor-styles');

	// Load default block styles.
	add_theme_support('wp-block-styles');

	// Add support for responsive embeds.
	add_theme_support('responsive-embeds');
	add_theme_support('sidebar');
}
add_action('after_setup_theme', 'publicinsight_theme_support');

function create_post_type()
{
	register_post_type(
		'Project',
		array(
			'labels' => array(
				'name' => __('Project'),
				'singular_name' => __('Project'),
				'add_new_item' => __('Add Project'),
				'edit_item' => __('Edit Project')
			),
			'supports' => array(
				'title',
				'editor',
				'excerpt',
				'custom-fields',
				'revisions',
				'thumbnail',
				'author',
				'page-attributes',
			),
			'taxonomies'  => array('category'),
			'public' => true,
			'has_archive' => true,
			'show_in_rest' => true,
			'show_in_admin_bar' => true,
			'show_in_nav_menus' => true,
			'map_meta_cap' => true,
		)
	);
}
add_action('init', 'create_post_type', 0);


function wpse_get_template_part($slug, $name = null, $data = [])
{
	// here we're copying more of what get_template_part is doing.
	$templates = [];
	$name = (string) $name;

	if ('' !== $name) {
		$templates[] = "{$slug}-{$name}.php";
	}

	$templates[] = "{$slug}.php";

	$template = locate_template($templates, false);

	if (!$template) {
		return;
	}

	if ($data) {
		extract($data);
	}

	include($template);
}


function register_menu()
{
	register_nav_menus(
		array(
			'header-menu' => __('Main Menu'),
		)
	);
}
add_action('init', 'register_menu');

//This function is responsible for adding "my-parent-item" class to parent menu item's
function add_menu_parent_class($items)
{
	$parents = array();
	foreach ($items as $item) {
		//Check if the item is a parent item
		if ($item->menu_item_parent && $item->menu_item_parent > 0) {
			$parents[] = $item->menu_item_parent;
		}
	}

	foreach ($items as $item) {
		if (in_array($item->ID, $parents)) {
			//Add "menu-parent-item" class to parents
			$item->classes[] = 'my-parent-item';
		}
	}

	return $items;
}

//add_menu_parent_class to menu
add_filter('wp_nav_menu_objects', 'add_menu_parent_class');

if (!function_exists('glw_custom_pagination')) {
	function glw_custom_pagination(WP_Query $wp_query = null, $echo = true)
	{
		if ($wp_query === null) {
			global $wp_query;
		}
		$pages = paginate_links(
			array(
				'base'         => str_replace(999999999, '%#%', esc_url(get_pagenum_link(999999999))),
				'format'       => '?paged=%#%',
				'current'      => max(1, get_query_var('paged')),
				'total'        => $wp_query->max_num_pages,
				'type'         => 'array',
				'show_all'     => false,
				'end_size'     => 2,
				'mid_size'     => 1,
				'prev_next'    => true,
				'prev_text'    => '<i class="fa fa-angle-double-left"></i> Trang đầu',
				'next_text'    => 'Trang sau <i class="fa fa-angle-double-right"></i>',
				'add_args'     => false,
				'add_fragment' => ''
			)
		);

		if (is_array($pages)) {
			$pagination = '<ul class="page pageA pageA06">';
			foreach ($pages as $page) {
				$pagination .= '<li' . (strpos($page, 'current') !== false ? ' class="current" ' : '') . '>';
				if (strpos($page, 'current') !== false) {
					if (get_query_var('paged') > 1) {
						$pagination .= '<a ' . (strpos($page, 'current') !== false ? ' class="current" ' : '') . '>' . get_query_var('paged') . '</a>';
					} else {
						$pagination .= '<a' . (strpos($page, 'current') !== false ? ' class="current" ' : '') . '>' . 1 . '</a>';
					}
				} else {
					$pagination .= str_replace('class="page-numbers"', '', $page);
				}
				$pagination .= '</li>';
			}
			$pagination .= '</ul>';
			if ($echo === true) {
				echo $pagination;
			} else {
				return $pagination;
			}
		}
		return null;
	}
}
