<?php

namespace Drupal\drsneolimp\Plugin\rest\resource;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * Provides a resource to get trainer info.
 *
 * @RestResource(
 *   id = "get_trainer_resource",
 *   label = @Translation("Get trainer resource"),
 *   uri_paths = {
 *     "canonical" = "/api/v1/get-trainer/{id}/{lang}"
 *   }
 * )
 */
class GetTrainerResource extends ResourceBase {

  /**
   * A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;

  /**
   * Constructs a new GetTrainerResource object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   *   A current user instance.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    AccountProxyInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('drsneolimp'),
      $container->get('current_user')
    );
  }

  /**
   * Responds to GET requests.
   */
  public function get(int $id, $lang = 'ru') {
    $trainer = \Drupal::entityTypeManager()->getStorage('node')->load($id);
    if ($trainer && $trainer->bundle() == 'trainer') {
      return new ResourceResponse($trainer->getTranslation($lang));
    }
    else {
      $response['message'] = 'Article with provided ID is not found.';
      return new ResourceResponse($response, 400);
    }
  }

}
