/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, query, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSLinkWithIcon from '../link-with-icon/link-with-icon';
import { BASIC_COLOR_SCHEME } from '../../globals/shared-enums';
import styles from './card.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card footer.
 * @element dds-card-footer
 */
@customElement(`${ddsPrefix}-card-footer`)
class DDSCardFooter extends DDSLinkWithIcon {
  /**
   * The non-link container node, used when the link of parent `<dds-card>` should be used.
   */
  @query(`.${ddsPrefix}-ce--card__footer--static`)
  private _staticNode?: HTMLSpanElement;

  /**
   * `true` if the link of parent `<dds-card>` should be used.
   */
  get _shouldUseParentLink() {
    const { href, parentHref } = this;
    return Boolean(parentHref) && (!href || parentHref === href);
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = BASIC_COLOR_SCHEME.REGULAR;

  /**
   * The `href` in parent `<dds-card>`.
   * `<dds-card>` sets this automatically.
   */
  @property({ attribute: 'parent-href', reflect: true })
  parentHref?: string;

  /**
   * The slot in parent `<dds-card>`.
   */
  @property({ reflect: true })
  slot = 'footer';

  protected _renderInner() {
    const { _shouldUseParentLink: shouldUseParentLink } = this;
    return !shouldUseParentLink
      ? html`
          <span><slot></slot></span><slot name="icon"></slot>
        `
      : html`
          <slot name="icon"></slot><span><slot></slot></span>
        `;
  }

  updated() {
    super.updated();
    const { _staticNode: staticNode, _linkNode: linkNode, _shouldUseParentLink: shouldUseParentLink } = this;
    const targetNode = linkNode ?? staticNode;
    targetNode!.classList.add(`${ddsPrefix}-ce--card__footer`);
    targetNode!.classList.toggle(`${ddsPrefix}-ce--card__footer--with-link-used`, !shouldUseParentLink);
  }

  render() {
    const { _shouldUseParentLink: shouldUseParentLink } = this;
    return shouldUseParentLink
      ? html`
          <span class="${ddsPrefix}-ce--card__footer--static">${this._renderInner()}</span>
        `
      : super.render();
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCardFooter;